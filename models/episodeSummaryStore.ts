import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EpisodeSummaryModel, EpisodeSummarySnapshot } from "../episodeSummary/episodeSummary"
import { EpisodeSummaryApi } from "../../services/api/episodeSummary-api"
import { withEnvironment } from "../extensions/with-environment"

export const EpisodeSummaryStoreModel = types
  .model("EpisodeSummaryStore")
  .props({
    episodeSummaries: types.optional(types.array(EpisodeSummaryModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveEpisodeSummaries: (EpisodeSummarySnapshots: EpisodeSummarySnapshot[]) => {
      self.episodeSummaries.replace(EpisodeSummarySnapshots)
    },
  }))
  .actions((self) => ({
    getEpisodeSummaries: async () => {
      const episodeSummaryApi = new EpisodeSummaryApi(self.environment.api)
      const result = await episodeSummaryApi.getEpisodeSummaries()

      if (result.kind === "ok") {
        self.saveEpisodeSummaries(result.episodeSummaries)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type EpisodeSummaryStoreType = Instance<typeof EpisodeSummaryStoreModel>
export interface EpisodeSummaryStore extends EpisodeSummaryStoreType {}
type EpisodeSummaryStoreSnapshotType = SnapshotOut<typeof EpisodeSummaryStoreModel>
export interface EpisodeSummaryStoreSnapshot extends EpisodeSummaryStoreSnapshotType {}
export const createEpisodeSummaryStoreDefaultModel = () => types.optional(EpisodeSummaryStoreModel, {})
