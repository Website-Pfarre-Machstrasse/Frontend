import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Category} from '../../data/category';
import {Page} from '../../data/page';


const MOCK: Category[] = [];
for (let i = 0; i < 5; i++) {
  const pages: Page[] = [];
  for (let j = 0; j < 5; j++) {
    pages.push({id: `mock${j}`, title: `Page${j}`, content$: of('')});
  }
  MOCK.push({id: `mock${i}`, title: `Category${i}`, pages$: of(pages)});
}

const HOME = `
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquid aspernatur, autem consectetur consequatur
deleniti eligendi enim et modi molestias mollitia natus necessitatibus nobis nulla numquam, odit omnis pariatur
perferendis possimus quae qui quia quibusdam quo saepe sit voluptas voluptatem! Aliquam at aut consequatur culpa
dignissimos itaque libero minima, nemo nobis porro praesentium, quidem rem repudiandae sapiente sunt temporibus vel
veniam voluptates! Animi necessitatibus quaerat quisquam totam ullam voluptatibus. Adipisci, aliquid amet aperiam
atque consequatur distinctio dolore excepturi facilis incidunt laboriosam laborum maxime minus molestiae nesciunt
nihil optio pariatur quo similique! Ab aut dolor, labore nobis perspiciatis quaerat rem ullam!

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, illum.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolorum incidunt saepe voluptate.
Deserunt, facilis.
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus enim iure magni maxime
mollitia repellendus.
Aperiam expedita explicabo molestias neque qui ut veniam. Blanditiis cumque doloribus
mollitia quas qui sequi.
Accusantium, animi dolorum facere hic illum, ipsa iste laudantium nam nihil quisquam
quod vitae voluptate?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, soluta?
`;

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public getCategories(): Observable<Category[]> {
    return of(MOCK);
  }

  public getHomeContent(): Observable<string> {
    return of(HOME);
  }
}
