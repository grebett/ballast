import { Instance, SnapshotOut, types } from 'mobx-state-tree';

const SourceModel = types.model('Source').props({
  main: types.string,
  loop: types.maybe(types.string),
});

export const SoundModel = types.model('Sound').props({
  id: types.identifierNumber,
  multipart: types.boolean,
  description: types.string,
  type: types.string,
  loop: types.boolean,
  sources: SourceModel,
  duration: types.number,
  start: types.number,
  delay: types.number,
});

type SoundType = Instance<typeof SoundModel>;
export interface Sound extends SoundType {}
type SoundSnapshotType = SnapshotOut<typeof SoundModel>;
export interface SoundSnapshot extends SoundSnapshotType {}
