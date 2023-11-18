import { VocationId } from 'models/vocation';
import { WeightClass } from 'models/status';
import { LevelRangeId } from 'models/levelRange';

export type VocationStep = VocationId;
export type VocationPathPartial = VocationStep[];
type VocationPathInfo = { [K in LevelRangeId]: VocationPathPartial };
export type CharacterInfo = {
  vocationPath: VocationPathInfo;
  weightClass: WeightClass;
};
