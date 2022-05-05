import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BookStoreModel } from "../book-store/book-store"
import { EpisodeSummaryStoreModel } from "../episodeSummary-store/episodeSummary-store"
import { EpisodeStoreModel } from "../episode-store/episode-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  bookStore: types.optional(BookStoreModel, {} as any),
  episodeSummaryStore: types.optional(EpisodeSummaryStoreModel, {} as any),
  episodeStore: types.optional(EpisodeStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
