import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { PageModel, PageSnapshot } from './page';
import { getPages } from '../services/api/bookApi';

export const PageStoreModel = types
  .model('PageStore')
  .props({
    pages: types.optional(types.array(PageModel), []),
    index: types.optional(types.number, 0), // TODO: later on keep track on which page the user is
  })
  .actions((self) => ({
    savePages: (PageSnapshots: PageSnapshot[]) => {
      self.pages.replace(PageSnapshots);
    },
  }))
  .actions((self) => ({
    getPages: async () => {
      const result = await getPages(0); // TODO: make it dynamic
      if (result.kind === 'ok') {
        self.savePages(result.pages);
      }
    },
    increaseIndex: () => {
      const totalPages = self.pages.length;
      if (self.index + 1 >= totalPages) {
        console.log(self.index);
        return;
      }
      self.index += 1;
      console.log(self.index);
    },
    decreaseIndex: () => {
      if (self.index - 1 < 0) {
        console.log(self.index);
        return;
      }
      self.index -= 1;
      console.log(self.index);
    },
  }));

type PageStoreType = Instance<typeof PageStoreModel>;
export interface PageStore extends PageStoreType {}
type PageStoreSnapshotType = SnapshotOut<typeof PageStoreModel>;
export interface PageStoreSnapshot extends PageStoreSnapshotType {}
