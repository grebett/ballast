type ResponseStatus = 'ok' | 'error' | 'bad-data';

type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  totalChapters: number;
  status: 'active' | 'soon';
};

export type GetBooksResult = { kind: ResponseStatus; books: Book[] };
export type GetBookResult = { kind: ResponseStatus; book: Book };
