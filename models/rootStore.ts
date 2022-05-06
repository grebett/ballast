import { createContext, useContext } from 'react';
import { Instance, SnapshotOut, types, onSnapshot } from 'mobx-state-tree';

import { BookStoreModel } from './bookStore';

// Functions
const setupRootStore = async () => {
  const rootStore = RootStoreModel.create({});
  onSnapshot(rootStore, (snapshot) => console.log(snapshot));
  return rootStore;
};

const createRootStoreExports = () => {
  const RootStoreContext = createContext<RootStore>({} as RootStore);
  const RootStoreProvider = RootStoreContext.Provider;
  const useStores = () => useContext(RootStoreContext);

  return {
    RootStoreProvider, // used in App.tsx as a HOC
    useStores, // custom hook to call the context
  };
};

// Main
const RootStoreModel = types.model('RootStore').props({
  bookStore: types.optional(BookStoreModel, {}),
});


// Exports
export const { useStores, RootStoreProvider } = createRootStoreExports();
export { setupRootStore };

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
