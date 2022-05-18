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
  sounds: [
    {
      id: number;
      description: string;
      type: string;
      loop: boolean;
      sources: {
        main: string;
        loop: string;
      };
      duration: number;
      start: number;
      delay: number;
    }
  ],
  ends: number[];
};

export type GetBooksResult = { kind: ResponseStatus; books: Book[] };
export type GetBookResult = { kind: ResponseStatus; book: Book };
export type GetPagesResult = { kind: ResponseStatus; pages: Page[] };
