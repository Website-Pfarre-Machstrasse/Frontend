import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import {ContentService} from '../../shared/services/content.service';
import { MediaService } from '../../shared/services/media.service';
import {CodemirrorComponent} from '@ctrl/ngx-codemirror';
import * as CodeMirror from 'codemirror';
import {Editor, EditorConfiguration} from 'codemirror';
import {LoggerService} from '../../core/logging/logger.service';
import {Logger} from 'src/app/core/logging/logger';
import {UploadResult} from '../../data/upload-result';

import 'codemirror/lib/codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/addon/display/fullscreen';
import { MatDialog } from '@angular/material/dialog';
import { MediaBrowserComponent } from './media-browser/media-browser.component';
import { ComponentType } from '@angular/cdk/overlay';

interface ToolbarAction {
  type: string;
  title: string;
  action: string;
}

interface ToolbarButton extends ToolbarAction {
  type: 'button';
  icon: string;
  data?: unknown;
}

interface ToolbarSelect extends ToolbarAction {
  type: 'select';
  options: string[];
}

type AnyToolbarAction = ToolbarButton | ToolbarSelect;
type ToolbarGroup = AnyToolbarAction[];
type Toolbar = { groups: { [name: string]: ToolbarGroup }; [Symbol.iterator](): any };

interface ActionCallback {
  // eslint-disable-next-line @typescript-eslint/ban-types
  call: Function;
}

class SimpleActionCallback implements ActionCallback {
  call: (text: string) => string | { text: string; select: any };

  constructor(callback: SimpleActionCallback['call']) {
    this.call = callback;
  }

  public static of(callback: SimpleActionCallback['call']): SimpleActionCallback {
    return new SimpleActionCallback(callback);
  }
}

class DialogActionCallback implements ActionCallback {
  call: (value: {text: string; data: any}) => string | { text: string; select: any };
  type: ComponentType<any>;
  data: any;

  constructor(type: ComponentType<any>, callback: (value: any) => string, data?: any) {
    this.data = data ?? {};
    this.type = type;
    this.call = callback;
  }

  public static of(type: ComponentType<any>, callback: (value: any) => string, data?: any): DialogActionCallback {
    return new DialogActionCallback(type, callback, data);
  }
}

class ComplexActionCallback implements ActionCallback {
  call: (doc: CodeMirror.Doc, ...params: any[]) => void | Promise<void>;

  constructor(callback: ComplexActionCallback['call']) {
    this.call = callback;
  }

  public static of(callback: ComplexActionCallback['call']): ComplexActionCallback {
    return new ComplexActionCallback(callback);
  }
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editor') cm: CodemirrorComponent;
  @ViewChild('preview', {read: ElementRef}) preview: ElementRef<HTMLElement>;

  get fullscreen(): boolean {
    return this._fullscreen;
  }
  set fullscreen(fullscreen: boolean) {
    if (document.fullscreenEnabled) {
      if (fullscreen) {
        document.body.requestFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
    this._fullscreen = fullscreen;
  }
  headingValue = 0;
  content: string;
  scrollSync = true;
  viewMode = 1;
  actions: { [name: string]: ActionCallback } = {};
  editorOptions: EditorConfiguration = {
    indentWithTabs: false,
    lineWrapping: false,
    lineNumbers: false,
    theme: 'custom',
    mode: {
      gitHubSpice: false,
      name: 'gfm'
    }
  };
  toolbar: Toolbar = {
    groups: {},
    [Symbol.iterator]() {
      return Object.values(this.groups)[Symbol.iterator]();
    }
  };

  private _logger: Logger;
  private _fullscreen = false;
  private _lastDropEvent = null;
  private _syncingEditor = false;
  private _syncingPreview = false;
  private _saving$ = new BehaviorSubject(false);

  public get saving$(): Observable<boolean> {
    return this._saving$.asObservable();
  }

  public get page$(): Observable<[string, string]> {
    return this._activatedRoute.queryParamMap.pipe(map(value => [value.get('cat'), value.get('page')]));
  }

  public get content$(): Observable<string> {
    return this.page$.pipe(switchMap(value => this._contentService.getPageContent(value[0], value[1])));
  }

  constructor(private _activatedRoute: ActivatedRoute,
              private _contentService: ContentService,
              private _mediaService: MediaService,
              private _dialog: MatDialog,
              _loggerService: LoggerService) {
    this._logger = _loggerService.getLogger('Editor');
    this.registerAction('fileUploaded', ComplexActionCallback.of((doc: CodeMirror.Doc, result: UploadResult) => {
      let rep = `[${result.name}](${result.url})`;
      if (result.media) {
        rep = '!' + rep;
      }
      doc.replaceSelection(rep, 'end');
    }));

    this.registerToolbarAction(
      'font', {type: 'button', title: 'Bold', icon: 'format_bold', action: 'bold'},
      SimpleActionCallback.of(text => `**${text || 'Bold'}**`));
    this.registerToolbarAction(
      'font', {type: 'button', title: 'Italic', icon: 'format_italic', action: 'italic'},
      SimpleActionCallback.of(text => `*${text || 'Italic'}*`));
    this.registerToolbarAction(
      'font', {type: 'button', title: 'Underline', icon: 'format_underline', action: 'underline'},
      SimpleActionCallback.of(text => `<u>${text || 'Underline'}</u>`));
    this.registerToolbarAction(
      'font', {type: 'button', title: 'Strikethrough', icon: 'format_strikethrough', action: 'strikethrough'},
      SimpleActionCallback.of(text => `~~${text || 'Strikethrough'}~~`));
    this.registerToolbarAction(
      'font', {type: 'select', options: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'], title: 'Heading', action: 'heading'},
      ComplexActionCallback.of((doc, e) => {
        EditorComponent.selectLine(doc);
        let line = doc.getSelection();
        line = line.replace(/(#+ )?(.*)/g, (substring, g1, g2) => {
          if (substring.isWhitespaceOrEmpty()) {
            return '';
          }
          return e > 0 ? '#'.repeat(e) + ' ' + g2 : g2;
        });
        doc.replaceSelection(line);
      }));

    const mediaCallback = value => {
      let rep = `[${value.text || value.data.name}](${value.data._links.file.replace('/api', '{server}')})`;
      if (value.data.mimetype.startsWith('image') || value.data.mimetype.startsWith('video') || value.data.mimetype.startsWith('audio')) {
        rep = '!' + rep;
      }
      return rep;
    };
    const linkCallback = value => `[${value.text || value.data.name}](${value.data._links.file.replace('/api', '{server}')})`;
    this.registerToolbarAction('media', {type: 'button', title: 'Link', icon: 'insert_link', action: 'link'},
      DialogActionCallback.of(MediaBrowserComponent, linkCallback, {data: {title: 'Link einfügen'}}));
    this.registerToolbarAction('media', {type: 'button', title: 'Image', icon: 'insert_photo', action: 'image'},
      DialogActionCallback.of(MediaBrowserComponent, mediaCallback, {data: {filter: 'image', title: 'Bild einfügen'}}));
    this.registerToolbarAction('media', {type: 'button', title: 'Video', icon: 'movie_creation', action: 'video'},
      DialogActionCallback.of(MediaBrowserComponent, mediaCallback, {data: {filter: 'video', title: 'Video einfügen'}}));
    this.registerToolbarAction('media', {type: 'button', title: 'Audio', icon: 'audiotrack', action: 'audio'},
      DialogActionCallback.of(MediaBrowserComponent, mediaCallback, {data: {filter: 'audio', title: 'Audio einfügen'}}));

    this.registerToolbarAction(
      'blocks', {type: 'button', title: 'Bullet Point List', icon: 'format_list_bulleted', action: 'ul'},
      SimpleActionCallback.of(text => `- ${text || 'Bullet Point List'}`));
    this.registerToolbarAction(
      'blocks', {type: 'button', title: 'Numbered List', icon: 'format_list_numbered', action: 'ol'},
      SimpleActionCallback.of(text => `1. ${text || 'Numbered List'}`));
    this.registerToolbarAction(
      'blocks', {type: 'button', title: 'Task List', icon: 'checklist', action: 'tl'},
      SimpleActionCallback.of(text => `- [ ] ${text || 'Task List'}`));
    this.registerToolbarAction(
      'blocks', {type: 'button', title: 'Code', icon: 'code', action: 'code'},
      SimpleActionCallback.of(text => `~~~\n${text || 'Code'}\n~~~`));
    this.registerToolbarAction(
      'blocks', {type: 'button', title: 'Refrence', icon: 'format_quote', action: 'quote'},
      SimpleActionCallback.of(text => `> ${text || 'Quote'}`));
  }

  public static selectLine(doc: CodeMirror.Doc): void {
    const cursor = doc.getCursor();
    doc.setSelection({line: cursor.line, ch: 0}, {line: cursor.line, ch: doc.getLine(cursor.line).length});
  }

  ngOnInit(): void {
    this.content$.subscribe(value => this.content = value);

    document.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        this.fullscreen = false;
      }
    };

    let themeStyle = document.getElementById('themeStyle') as HTMLLinkElement;
    if (!
      themeStyle
    ) {
      themeStyle = document.createElement('link');
    }
    themeStyle.href = 'editor.css';
    themeStyle.rel = 'stylesheet';
    themeStyle.id = 'themeStyle';
    document.head.appendChild(themeStyle);

    let cmStyle = document.getElementById('cmStyle') as HTMLLinkElement;
    if (!cmStyle) {
      cmStyle = document.createElement('link');
    }
    cmStyle.href = 'assets/codemirror/lib/codemirror.css';
    cmStyle.rel = 'stylesheet';
    cmStyle.id = 'cmStyle';
    document.head.appendChild(cmStyle);
  }

  ngAfterViewInit(): void {
    this.cm.codeMirror.getWrapperElement().style.height = '100%';
    this.cm.codeMirror.setCursor(0, this.cm.codeMirror.getLine(0).length);
  }

  ngOnDestroy(): void {
    document.getElementById('themeStyle')?.remove();
    document.getElementById('cmStyle')?.remove();
  }

  public registerToolbarGroup(name: string): void {
    this.toolbar.groups[name] = [];
  }

  public registerToolbarAction(group: string, action: AnyToolbarAction, callback?: ActionCallback): void {
    if (!(group in this.toolbar.groups)) {
      this.registerToolbarGroup(group);
    }
    if (callback && !(action.action in this.actions)) {
      this.registerAction(action.action, callback);
    }
    this.toolbar.groups[group].push(action);
  }

  public registerAction(action: string, callback: ActionCallback): void {
    this.actions[action] = callback;
  }

  public onEditorScrolled(event: CodeMirror.ScrollInfo): void {
    if (this.scrollSync && !this._syncingPreview) {
      this._syncingEditor = true;
      this.preview.nativeElement.scrollTo({top: this.preview.nativeElement.clientHeight * (event.top / event.height)});
    } else {
      this._syncingPreview = false;
    }
  }

  public onPreviewScrolled(event: Event): void {
    if (this.scrollSync && !this._syncingEditor) {
      this._syncingPreview = true;
      const target = event.target as HTMLElement;
      this.cm.codeMirror.scrollTo(
        undefined,
        this.cm.codeMirror.getScrollInfo().height * (target.scrollTop / target.clientHeight));
    } else {
      this._syncingEditor = false;
    }
  }

  public onFileDropped(event: [Editor, DragEvent] | DragEvent): void {
    if (Array.isArray(event)) {
      event = event[1];
    }
    event.preventDefault();
    if (this._lastDropEvent === event) {
      return;
    }
    this._lastDropEvent = event;
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      this._logger.debug('File dropped: {0}', file.name);
      this._mediaService.uploadFile(file).subscribe(result => this.executeAction('fileUploaded', result));
    }
  }

  public onCursorMoved(editor: CodeMirror.Editor): void {
    const doc = editor.getDoc();
    doc.getLine(doc.getCursor().line).replace(/^(#*)/g, (substring, h) => {
      this.headingValue = h.length;
      return substring;
    });
  }

  public executeAction(action: string, ...params: any[]): void {
    if (!(action in this.actions)) {
      this._logger.warn('No action registered for name: {0}', action);
      return;
    }
    const callback = this.actions[action];
    const editor = this.cm.codeMirror;
    const doc = editor.getDoc();
    if (callback instanceof ComplexActionCallback) {
      const result = callback.call(doc, ...params);
      if (result) {
        result.then(() => editor.focus());
      } else {
        editor.focus();
      }
    } else if (callback instanceof SimpleActionCallback) {
      const selection = doc.getSelection();
      let ret = callback.call(selection);
      if (typeof ret !== 'string') {
        ret = ret.text;
      }
      doc.replaceSelection(ret);
      editor.focus();
    } else if (callback instanceof DialogActionCallback) {
      const ref = this._dialog.open(callback.type, {data: callback.data});
      ref.afterClosed().pipe(
        filter(value => !!value),
        switchMap(value => Array.isArray(value) ? value : [value]),
        map(value => callback.call({data: value, text: doc.getSelection()}))
      ).subscribe(ret => {
        if (typeof ret !== 'string') {
          const {select, text} = ret;
          doc.replaceSelection(text);
          doc.setCursor({line: doc.getCursor().line, ch: select});
        } else {
          doc.replaceSelection(ret);
        }
        editor.focus();
      });
    }
  }

  public save(): void {
    this.page$.pipe(
      tap(() => this._saving$.next(true)),
      switchMap(([cat, page]) => this._contentService.saveContent(cat, page, this.cm.codeMirror.getValue())),
      tap(value => this.cm.codeMirror.setValue(value))
    ).subscribe(() => {
      this._logger.info('Successfully saved!');
      this._saving$.next(false);
    }, (error: unknown) => {
      this._logger.error(error as Error);
      this._saving$.next(false);
    });
  }
}
