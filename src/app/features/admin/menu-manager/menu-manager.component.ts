import { Component } from '@angular/core';
import { Category } from '../../../data/category';
import { ContentService } from '../../../shared/services/content.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Page } from '../../../data/page';
import { map, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent {
  categories: Category[];
  pages: Page[][];

  constructor(content: ContentService) {
    content.getCategories().pipe(mergeMap((categories) => {
      this.categories = categories;
      this.pages = [];
      return categories.map<Observable<[Page[], number]>>((value, i) => value.pages$.pipe(map(pages => [pages, i])));
    }), mergeMap(value => value)).subscribe(([pages, i]) => this.pages[i] = pages);
  }

  dropPage(event: CdkDragDrop<Page[]>): void {
    console.log(event);
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  dropCategory(event: CdkDragDrop<Category[]>): void {
    console.log(event);
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
