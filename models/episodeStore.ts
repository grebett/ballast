import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EpisodeModel, EpisodeSnapshot } from "../episode/episode"
import { EpisodeApi } from "../../services/api/episode-api"
import { withEnvironment } from "../extensions/with-environment"

export const EpisodeStoreModel = types
  .model("EpisodeStore")
  .props({
    episode: types.optional(types.array(EpisodeModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveEpisode: (EpisodeSnapshot: EpisodeSnapshot[]) => {
      self.episode.replace(EpisodeSnapshot as any) // why should I put it in an ARRRRRRAY?
    },
  }))
  .actions((self) => ({
    getEpisode: async (id: string | number) => {
      const episodeApi = new EpisodeApi(self.environment.api)
      const result = await episodeApi.getEpisode(id)
      if (result.kind === "ok") {
        const mappedEpisode = {
          ...result.episode,
          pages: result.episode.pages.map((page, i) => ({...page, key: i})),
        };
        self.saveEpisode([mappedEpisode])
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type EpisodeStoreType = Instance<typeof EpisodeStoreModel>
export interface EpisodeStore extends EpisodeStoreType {}
type EpisodeStoreSnapshotType = SnapshotOut<typeof EpisodeStoreModel>
export interface EpisodeStoreSnapshot extends EpisodeStoreSnapshotType {}
export const createEpisodeStoreDefaultModel = () => types.optional(EpisodeStoreModel, {})
