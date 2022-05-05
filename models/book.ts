import { Instance, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Ballast book model.
 */
export const BookModel = types.model('Book').props({
  id: types.identifierNumber,
  title: types.string,
  author: types.string,
  cover: types.string,
  totalEpisodes: types.integer,
  status: types.string,
});

type BookType = Instance<typeof BookModel>;
export interface Book extends BookType {}
type BookSnapshotType = SnapshotOut<typeof BookModel>;
export interface BookSnapshot extends BookSnapshotType {}
