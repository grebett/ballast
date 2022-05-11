type ResponseStatus = 'ok' | 'error' | 'bad-data';

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  totalChapters: number;
  status: 'active' | 'soon';
};

type Page = {
  id: number;
  text: string;
  sound: {
    type: string;
    source: string;
    unique: boolean;
  };
};

export type GetBooksResult = { kind: ResponseStatus; books: Book[] };
export type GetBookResult = { kind: ResponseStatus; book: Book };
export type GetPagesResult = { kind: ResponseStatus; pages: Page[] };
