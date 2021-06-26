import {Media} from './media';

export interface Gallery {
  id: string;
  title: string;
  owner: string;
  media: Media[];
}
