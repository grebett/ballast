import { Instance, SnapshotOut, types } from 'mobx-state-tree';

export const SoundModel = types.model('Sound').props({
  type: types.string,
  unique: types.boolean,
  source: types.string,
});

type SoundType = Instance<typeof SoundModel>;
export interface Sound extends SoundType {}
type SoundSnapshotType = SnapshotOut<typeof SoundModel>;
export interface SoundSnapshot extends SoundSnapshotType {}