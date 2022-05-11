import axios from 'axios';
import { GetBooksResult } from '../../services/api/api.types';

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
    const resultBooks = response.data.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      cover: item.cover,
      totalChapters: item.totalChapters,
      status: item.status,
    }));
    return { kind: 'ok', books: resultBooks };
  } catch (e) {
    console.error('oops', e);
    return { kind: 'bad-data', books: [] };
  }
};
