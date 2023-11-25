import { VocationId, VOCATION_IDS } from 'models/vocation';
import { LevelRangeId } from 'models/levelRange';
import { StatId, Status, evaluationStatus } from 'models/status';

export type StatusGrowth = {
  levelRangeId: LevelRangeId;
  vocationId: VocationId;
  status: Status;
};

export const statusGrowths: readonly StatusGrowth[] = [
  {
    levelRangeId: LevelRangeId.onlyLv1,
    vocationId: VOCATION_IDS.fighter,
    status: {
      hp: 450,
      st: 500,
      atk: 80,
      matk: 60,
      def: 80,
      mdef: 60,
    },
  },
  {
    levelRangeId: LevelRangeId.onlyLv1,
    vocationId: VOCATION_IDS.strider,
    status: {
      hp: 430,
      st: 500,
      atk: 70,
      matk: 70,
      def: 70,
      mdef: 70,
    },
  },
  {
    levelRangeId: LevelRangeId.onlyLv1,
    vocationId: VOCATION_IDS.mage,
    status: {
      hp: 410,
      st: 500,
      atk: 60,
      matk: 80,
      def: 60,
      mdef: 80,
    },
  },
  // forLv10
  {
    levelRangeId: LevelRangeId.forLv10,
    vocationId: VOCATION_IDS.fighter,
    status: {
      hp: 30,
      st: 20,
      atk: 4,
      matk: 2,
      def: 3,
      mdef: 2,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv10,
    vocationId: VOCATION_IDS.strider,
    status: {
      hp: 25,
      st: 25,
      atk: 3,
      matk: 3,
      def: 3,
      mdef: 2,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv10,
    vocationId: VOCATION_IDS.mage,
    status: {
      hp: 22,
      st: 20,
      atk: 2,
      matk: 4,
      def: 3,
      mdef: 3,
    },
  },
  // forLv100
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.fighter,
    status: {
      hp: 37,
      st: 15,
      atk: 4,
      matk: 2,
      def: 4,
      mdef: 1,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.strider,
    status: {
      hp: 25,
      st: 25,
      atk: 3,
      matk: 3,
      def: 3,
      mdef: 2,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.mage,
    status: {
      hp: 21,
      st: 10,
      atk: 2,
      matk: 4,
      def: 1,
      mdef: 4,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.warrior,
    status: {
      hp: 40,
      st: 10,
      atk: 5,
      matk: 2,
      def: 3,
      mdef: 1,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.ranger,
    status: {
      hp: 21,
      st: 30,
      atk: 4,
      matk: 3,
      def: 2,
      mdef: 2,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.sorcerer,
    status: {
      hp: 16,
      st: 15,
      atk: 2,
      matk: 5,
      def: 1,
      mdef: 5,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.assassin,
    status: {
      hp: 22,
      st: 27,
      atk: 6,
      matk: 2,
      def: 2,
      mdef: 1,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.magick_archer,
    status: {
      hp: 21,
      st: 20,
      atk: 2,
      matk: 3,
      def: 3,
      mdef: 4,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv100,
    vocationId: VOCATION_IDS.mystic_knight,
    status: {
      hp: 30,
      st: 20,
      atk: 2,
      matk: 3,
      def: 3,
      mdef: 3,
    },
  },

  // forLv200
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.fighter,
    status: {
      hp: 15,
      st: 5,
      atk: 1,
      matk: 0,
      def: 3,
      mdef: 0,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.strider,
    status: {
      hp: 5,
      st: 15,
      atk: 1,
      matk: 1,
      def: 1,
      mdef: 1,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.mage,
    status: {
      hp: 10,
      st: 10,
      atk: 0,
      matk: 2,
      def: 0,
      mdef: 2,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.warrior,
    status: {
      hp: 5,
      st: 15,
      atk: 2,
      matk: 0,
      def: 2,
      mdef: 0,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.ranger,
    status: {
      hp: 5,
      st: 15,
      atk: 2,
      matk: 0,
      def: 1,
      mdef: 1,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.sorcerer,
    status: {
      hp: 10,
      st: 10,
      atk: 0,
      matk: 3,
      def: 0,
      mdef: 1,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.assassin,
    status: {
      hp: 5,
      st: 15,
      atk: 3,
      matk: 0,
      def: 1,
      mdef: 0,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.magick_archer,
    status: {
      hp: 10,
      st: 10,
      atk: 1,
      matk: 1,
      def: 0,
      mdef: 2,
    },
  },
  {
    levelRangeId: LevelRangeId.forLv200,
    vocationId: VOCATION_IDS.mystic_knight,
    status: {
      hp: 15,
      st: 5,
      atk: 1,
      matk: 1,
      def: 1,
      mdef: 1,
    },
  },
] as const;

export function getStatusGrowth(
  vocationId: VocationId,
  levelRangeId: LevelRangeId,
): StatusGrowth {
  const growth = statusGrowths.find(
    (s) => s.levelRangeId === levelRangeId && s.vocationId === vocationId,
  );
  if (!growth) throw new Error('invalid vocationId or levelRangeId');
  return growth;
}

type StatusGrowthWithScore = StatusGrowth & { score: number };

export function sortByFocusedStatIds(
  growths: StatusGrowth[],
  focusedStatIds: StatId[],
): StatusGrowthWithScore[] {
  const growthsWithScore = growths.map((growth) => {
    const score = evaluationStatus(growth.status, focusedStatIds);
    return { ...growth, score };
  });
  const sorted = growthsWithScore.sort((a, b) => {
    const aScore = a.score;
    const bScore = b.score;
    return bScore - aScore;
  });
  return sorted;
}
