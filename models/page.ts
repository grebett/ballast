import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SoundModel } from "../sound/sound"

/**
 * Ballast Page summary model.
 */
export const PageModel = types.model("Page").props({
  key: types.identifierNumber,
  text: types.string,
  sound: SoundModel,
})

type PageType = Instance<typeof PageModel>
export interface Page extends PageType {}
type PageSnapshotType = SnapshotOut<typeof PageModel>
export interface PageSnapshot extends PageSnapshotType {}
export const createPageDefaultModel = () => types.optional(PageModel, {})
