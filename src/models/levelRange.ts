import { VOCATION_IDS, VocationId } from './vocation';

export enum LevelRangeId {
  onlyLv1 = 'onlyLv1',
  forLv10 = 'forLv10',
  forLv100 = 'forLv100',
  forLv200 = 'forLv200',
}

export type LevelRange = {
  id: LevelRangeId;
  from: number;
  to: number;
  availableVocationIds: VocationId[];
};

const basicVocationIds: VocationId[] = [
  VOCATION_IDS.fighter,
  VOCATION_IDS.strider,
  VOCATION_IDS.mage,
];
const advancedVocationIds: VocationId[] = [
  VOCATION_IDS.warrior,
  VOCATION_IDS.ranger,
  VOCATION_IDS.sorcerer,
];
const HybridVocationIds: VocationId[] = [
  VOCATION_IDS.assassin,
  VOCATION_IDS.magick_archer,
  VOCATION_IDS.mystic_knight,
];
const allVocationIds = [
  ...basicVocationIds,
  ...advancedVocationIds,
  ...HybridVocationIds,
];

const LevelRanges: readonly LevelRange[] = [
  {
    id: LevelRangeId.onlyLv1,
    from: 1,
    to: 1,
    availableVocationIds: basicVocationIds,
  },
  {
    id: LevelRangeId.forLv10,
    from: 2,
    to: 10,
    availableVocationIds: basicVocationIds,
  },
  {
    id: LevelRangeId.forLv100,
    from: 11,
    to: 100,
    availableVocationIds: allVocationIds,
  },
  {
    id: LevelRangeId.forLv200,
    from: 101,
    to: 200,
    availableVocationIds: allVocationIds,
  },
] as const;

export function getLevelRangeById(levelRangeId: LevelRangeId): LevelRange {
  const levelRange = LevelRanges.find((range) => range.id === levelRangeId);
  if (!levelRange) throw new Error(`invalid levelRangeId${LevelRangeId}`);
  return levelRange;
}

export function getAllLevelRanges(): readonly LevelRange[] {
  return LevelRanges;
}
