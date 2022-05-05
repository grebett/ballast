import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { BookModel, BookSnapshot } from './book';
import { getBooks } from '../services/api/bookApi';

export const BookStoreModel = types
  .model('BookStore')
  .props({
    books: types.optional(types.array(BookModel), []),
  })
  .actions((self) => ({
    saveBooks: (BookSnapshots: BookSnapshot[]) => {
      self.books.replace(BookSnapshots);
    },
  }))
  .actions((self) => ({
    getBooks: async () => {
      const result = await getBooks();
      if (result.kind === 'ok') {
        self.saveBooks(result.books);
      }
    },
  }));

type BookStoreType = Instance<typeof BookStoreModel>;
export interface BookStore extends BookStoreType {}
type BookStoreSnapshotType = SnapshotOut<typeof BookStoreModel>;
export interface BookStoreSnapshot extends BookStoreSnapshotType {}
