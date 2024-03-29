import { Instance, SnapshotOut, types, cast } from 'mobx-state-tree';
import { PageModel, PageSnapshot } from './page';
import { getPages } from '../services/api/bookApi';

export const PageStoreModel = types
  .model('PageStore')
  .props({
    pages: types.optional(types.array(PageModel), []),
    index: types.optional(types.number, 0), // 0 TODO: later on keep track on which page the user is
  })
  .actions((self) => ({
    savePages: (pages: PageSnapshot[]) => {
      self.pages.replace(
        // https://stackoverflow.com/questions/55689302/mobx-state-tree-assign-to-array-type
        pages.map((page) => ({
          ...page,
          sounds: cast(page.sounds),
          ends: cast(page.ends),
        }))
      );
    },
  }))
  .actions((self) => ({
    getPages: async () => {
      const result = await getPages(0); // TODO: make it dynamic
      if (result.kind === 'ok') {
        self.savePages(result.pages);
      }
    },
    setIndex: (index: number) => {
      self.index = index;
    },
    increaseIndex: () => {
      const totalPages = self.pages.length;
      if (self.index + 1 >= totalPages) {
        return;
      }
      self.index += 1;
    },
    decreaseIndex: () => {
      if (self.index - 1 < 0) {
        return;
      }
      self.index -= 1;
    },
  }));

type PageStoreType = Instance<typeof PageStoreModel>;
export interface PageStore extends PageStoreType {}
type PageStoreSnapshotType = SnapshotOut<typeof PageStoreModel>;
export interface PageStoreSnapshot extends PageStoreSnapshotType {}
