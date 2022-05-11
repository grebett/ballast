import { Instance, SnapshotOut, types } from 'mobx-state-tree';

import { SoundModel } from './sound';

/**
 * Ballast page model.
 */
export const PageModel = types.model('Page').props({
  id: types.identifierNumber,
  text: types.string,
  sound: SoundModel,
});

type PageType = Instance<typeof PageModel>;
export interface Page extends PageType {}
type PageSnapshotType = SnapshotOut<typeof PageModel>;
export interface PageSnapshot extends PageSnapshotType {}
