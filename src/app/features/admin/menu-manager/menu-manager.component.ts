import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Category } from '../../../data/category';
import { ContentService } from '../../../shared/services/content.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Page } from '../../../data/page';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent {
  @ViewChild('dialog', {static: true}) private _dialog: TemplateRef<{ data: { obj: unknown; title: string } }>;
  @ViewChild('trash', {static: true}) private _trashDialog: TemplateRef<{ data: Page[] }>;
  categories: Category[];
  pages: Page[][];
  deletedPages: Page[] = [];
  private _categories: readonly Category[];
  private _pages: readonly Page[][];

  constructor(private _content: ContentService, private _dialogService: MatDialog, private _router: Router) {
    this._content.getCategories().pipe(mergeMap((categories) => {
      this.categories = categories;
      this.pages = [];
      return categories.map<Observable<[Page[], number]>>((value, i) => value.pages$.pipe(map(pages => [pages, i])));
    }), mergeMap(value => value), map(([pages, i]) => this.pages[i] = pages)).subscribe(() => {
      this._categories = Object.freeze(Object.clone(this.categories));
      this._pages = Object.freeze(Object.clone(this.pages));
    });
  }

  dropPage(event: CdkDragDrop<{ category: Category; pages: Page[] }>): void {
    console.log(event);
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data.pages, event.previousIndex, event.currentIndex);
      event.container.data.pages.forEach((value, index) => value.order = index);
    } else {
      transferArrayItem(event.previousContainer.data.pages, event.container.data.pages, event.previousIndex, event.currentIndex);
      event.previousContainer.data.pages.forEach((value, index) => value.order = index);
      event.container.data.pages.forEach((value, index) => value.order = index);
      event.item.data.category = event.container.data.category.id;
    }
  }

  addPage(cat: Category, i: number, n: number): void {
    const ref = this._dialogService.open(this._dialog, {data: {obj: {}, title: 'Seite Erstellen'}});
    ref.afterClosed().pipe(
      filter(value => !!value),
      map(value => {
        value.category = cat.id;
        value.order = n;
        return value as Page;
     })
    ).subscribe(value => {
      this.pages[i].push(value);
    });
  }

  editPage(page: Page): void {
    const ref = this._dialogService.open(this._dialog, {data: {obj: Object.clone(page), title: 'Seite Bearbeiten', isPage: true}});
    ref.afterClosed().pipe(filter(value => !!value)).subscribe(value => {
      page.id = value.id;
      page.title = value.title;
    });
  }

  deletePage(page: Page, i: number): void {
    this.deletedPages.push(page);
    const index = this.pages[i].indexOf(page, 0);
    if (index > -1) {
      this.pages[i].splice(index, 1);
    }
    this.pages[i].forEach((value, index1) => value.order = index1);
  }

  editPageContent(page: Page): void {
    this._router.navigate(['editor'], {queryParams: {cat: page.category, page: page.id}});
  }

  dropCategory(event: CdkDragDrop<{ categories: Category[]; pages: Page[][] }>): void {
    console.log(event);
    moveItemInArray(event.container.data.categories, event.previousIndex, event.currentIndex);
    moveItemInArray(event.container.data.pages, event.previousIndex, event.currentIndex);
    event.container.data.categories.forEach((value, index) => value.order = index);
  }

  addCategory(n: number): void {
    const ref = this._dialogService.open(this._dialog, {data: {obj: {}, title: 'Kategorie Erstellen'}});
    ref.afterClosed().pipe(
      filter(value => !!value),
      map(value => {
        value.order = n;
        return value as Category;
      })
    ).subscribe(value => {
      this.categories.push(value);
      this.pages.push([]);
    });
  }

  deleteCategory(cat: Category): void {
    const i = this.categories.indexOf(cat);
    Object.clone(this.pages[i]).forEach(page => this.deletePage(page, i));
  }

  openTrash(): void {
    this._dialogService.open(this._trashDialog, {data: this.deletedPages, disableClose: false});
  }

  restore(page: Page): void {
    const i = this.categories.findIndex(value => value.id === page.category);
    this.pages[i].splice(page.order, 0, page);
    this.pages[i].forEach((value, index) => value.order = index);
    const insert = this.deletedPages.indexOf(page, 0);
    if (insert > -1) {
      this.deletedPages.splice(insert, 1);
    }
  }

  save(): void {
    console.log(Object.diff(this.pages, this._pages));
    console.log(Object.diff(this.categories, this._categories));
  }
}
