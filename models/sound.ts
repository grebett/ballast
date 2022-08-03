import { Instance, SnapshotOut, types } from 'mobx-state-tree';

const SourceModel = types.model('Source').props({
  source: types.string,
});

export const SoundModel = types.model('Sound').props({
  id: types.identifierNumber,
  description: types.string,
  type: types.string,
  parts: types.array(SourceModel),
  delay: types.number,
});

type SoundType = Instance<typeof SoundModel>;
export interface Sound extends SoundType {}
type SoundSnapshotType = SnapshotOut<typeof SoundModel>;
export interface SoundSnapshot extends SoundSnapshotType {}
