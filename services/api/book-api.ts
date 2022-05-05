import axios from 'axios';

// import { GetBooksResult, GetBookResult, Book } from "./api.types"

export const getBooks = async (): Promise<any> => {
  // async getBooks(): Promise<GetBooksResult> {
  try {
    // make the api call
    const response = await axios.get(`http://10.0.0.14:3000/api/book`);

    // the typical ways to die when calling an api
    if (response.status !== 200) {
      console.log(response.status);
      return { kind: 'error' };
    }

    // // transform the data into the format we are expecting
      const resultBooks: any[] = response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        cover: item.cover,
        episodes: item.episodes, // number
        status: item.status,
      }))
    return { kind: 'ok', books: resultBooks };
  } catch (e) {
    console.error('oops', e);
    return { kind: 'bad-data' };
  }
};