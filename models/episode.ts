import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { PageModel } from "../page/page"

/**
 * Ballast episode summary model.
 */
export const EpisodeModel = types.model("Episode").props({
  id: types.identifierNumber,
  title: types.string,
  pages: types.array(PageModel),
})

type EpisodeType = Instance<typeof EpisodeModel>
export interface Episode extends EpisodeType {}
type EpisodeSnapshotType = SnapshotOut<typeof EpisodeModel>
export interface EpisodeSnapshot extends EpisodeSnapshotType {}
export const createEpisodeDefaultModel = () => types.optional(EpisodeModel, {})
