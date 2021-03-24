import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { UploadResult } from 'src/app/data/upload-result';
import {Category} from '../../data/category';

const MOCK = [];
for (let i = 0; i < 5; i++) {
  const pages = [];
  for (let j = 0; j < 5; j++) {
    pages.push({id: `mock${j}`, title: `Page${j}`, content$: of('')});
  }
  MOCK.push({id: `mock${i}`, title: `Category${i}`, pages$: of(pages)});
}

const TEXT = `
GitHub Flavored Markdown
========================

Everything from markdown plus GFM features:

## URL autolinking

Underscores_are_allowed_between_words.

## Strikethrough text

GFM adds syntax to strikethrough text, which is missing from standard Markdown.

~~Mistaken text.~~
~~**works with other formatting**~~

~~spans across
lines~~

## Fenced code blocks (and syntax highlighting)

\`\`\`javascript
for (var i = 0; i < items.length; i++) {
    console.log(items[i], i); // log them
}
\`\`\`

## Task Lists

- [ ] Incomplete task list item
- [x] **Completed** task list item

## A bit of GitHub spice

See http://github.github.com/github-flavored-markdown/.

(Set \`gitHubSpice: false\` in mode options to disable):

* SHA: be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User@SHA ref: mojombo@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* User/Project@SHA: mojombo/god@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
* \\#Num: #1
* User/#Num: mojombo#1
* User/Project#Num: mojombo/god#1

(Set \`emoji: false\` in mode options to disable):

* emoji: :smile:

`;

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public getCategories(): Observable<Category[]> {
    return of(MOCK);
  }

  public getContent(category: string, page: string): Observable<string> {
    return of(TEXT);
  }

  uploadFile(file: File): Promise<UploadResult> {
    return new Promise<UploadResult>(resolve => {
      resolve({
        name: file.name,
        url: '',
        media: file.type.startsWith('image') || file.type.startsWith('video') || file.type.startsWith('audio')
      });
    });
  }
}
