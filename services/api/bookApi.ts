import axios from 'axios';
import { GetBooksResult, GetPagesResult } from '../../services/api/api.types';

export const getBooks = async (): Promise<GetBooksResult> => {
  try {
    // make the api call ===> TODO: config env everything and sync?
    const response = await axios.get<GetBooksResult['books']>(
      `http://10.0.0.14:3000/api/book`
    );

    // the typical ways to die when calling an api
    if (response.status !== 200) {
      console.error('oops', response);
      return { kind: 'error', books: [] };
    }

    // transform the data into the format we are expecting (mapper)
    const resultBooks = response.data.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover,
      totalChapters: book.totalChapters,
      status: book.status,
    }));
    return { kind: 'ok', books: resultBooks };
  } catch (e) {
    console.error('oops', e);
    return { kind: 'bad-data', books: [] };
  }
};

export const getPages = async (page: number, size = 1): Promise<GetPagesResult> => {
  try {
    // make the api call ===> TODO: config env everything and sync?
    const response = await axios.get<GetPagesResult['pages']>(
      `http://10.0.0.14:3000/api/book/pages?page=${page}&size=${size}`
    );

    // the typical ways to die when calling an api
    if (response.status !== 200) {
      console.error('oops', response);
      return { kind: 'error', pages: [] };
    }

    // TODO: transform the data into the format we are expecting (mapper) or do verfication check
    const resultPages = response.data.map((page) => ({
      id: page.id,
      text: page.text,
      sounds: page.sounds,
      ends: page.ends,
    }));
    return { kind: 'ok', pages: resultPages };
  } catch (e) {
    console.error('oops', e);
    return { kind: 'bad-data', pages: [] };
  }
};
