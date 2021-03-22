/* eslint-disable @angular-eslint/directive-selector */
import {Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


export interface RxSubscribeContext<T> {
  $implicit: T;
}

@Directive({
  selector: '[rxSubscribe]'
})
export class RxSubscribeDirective<T> implements OnInit, OnDestroy {
  @Input('rxSubscribe')
  source$: Observable<T>;

  private readonly _onDestroy$ = new Subject();

  constructor(
    private _vcRef: ViewContainerRef,
    private _templateRef: TemplateRef<RxSubscribeContext<T>>
  ) {}

  static ngTemplateContextGuard<U>(
    dir: RxSubscribeDirective<U>,
    ctx: unknown
  ): ctx is RxSubscribeContext<U> {
    return true;
  }

  ngOnInit(): void {
    let viewRef: EmbeddedViewRef<RxSubscribeContext<T>>;
    this.source$.pipe(takeUntil(this._onDestroy$)).subscribe(source => {
      if (!viewRef) {
        viewRef = this._vcRef.createEmbeddedView(this._templateRef, {
          $implicit: source
        });
      } else {
        viewRef.context.$implicit = source;
        viewRef.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }
}
