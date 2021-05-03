export interface MediaLinks {
  file: string;
  thumbnail: string;
}

export interface Media {
  _links: MediaLinks;
  id: string; //uuid
  name: string;
  mimetype: string;
  extension: string;
  owner: string; //uuid
}
