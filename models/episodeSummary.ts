import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Ballast episode summary model.
 */
export const EpisodeSummaryModel = types.model("EpisodeSummary").props({
  id: types.identifierNumber,
  title: types.string,
})

type EpisodeSummaryType = Instance<typeof EpisodeSummaryModel>
export interface EpisodeSummary extends EpisodeSummaryType {}
type EpisodeSummarySnapshotType = SnapshotOut<typeof EpisodeSummaryModel>
export interface EpisodeSummarySnapshot extends EpisodeSummarySnapshotType {}
export const createEpisodeSummaryDefaultModel = () => types.optional(EpisodeSummaryModel, {})
