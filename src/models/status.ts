import { CharacterInfo, VocationPathPartial } from 'models/playerInfo';
import { getStatusGrowth } from 'models/statusGrowth';
import { VocationId } from './vocation';
import { LevelRangeId } from './levelRange';

export enum StatId {
  hp = 'hp',
  st = 'st',
  atk = 'atk',
  matk = 'matk',
  def = 'def',
  mdef = 'mdef',
}

export const statIds = Object.values(StatId);

export type Status = {
  [K in StatId]: number;
};

export const WEIGHT_CLASSES = {
  ss: 'ss',
  s: 's',
  m: 'm',
  l: 'l',
  ll: 'll',
} as const;

export type WeightClass = (typeof WEIGHT_CLASSES)[keyof typeof WEIGHT_CLASSES];

const vanillaStatus = {
  hp: 0,
  st: 0,
  atk: 0,
  def: 0,
  matk: 0,
  mdef: 0,
};

export const statusBonusesFromWeight: { [K in WeightClass]: Status } = {
  ss: { ...vanillaStatus, st: 0 },
  s: { ...vanillaStatus, st: 20 },
  m: { ...vanillaStatus, st: 40 },
  l: { ...vanillaStatus, st: 60 },
  ll: { ...vanillaStatus, st: 80 },
} as const;

function sumStatuses(...statuses: Status[]): Status {
  let sum = vanillaStatus;
  statuses.forEach((status) => {
    sum = {
      hp: sum.hp + status.hp,
      st: sum.st + status.st,
      atk: sum.atk + status.atk,
      matk: sum.matk + status.matk,
      def: sum.def + status.def,
      mdef: sum.mdef + status.mdef,
    };
  });
  return sum;
}

function calcStatusByLevelRange(
  levelRangeId: LevelRangeId,
  path: VocationPathPartial,
): Status {
  const status = path.reduce((acc: Status, vocationId: VocationId) => {
    const growth = getStatusGrowth(vocationId, levelRangeId);
    if (!growth) throw new Error('invalid vocationId');
    return sumStatuses(acc, growth.status);
  }, vanillaStatus);
  return status;
}

export function getStatusFromCharacterInfo(playerInfo: CharacterInfo): Status {
  let status = vanillaStatus;
  status = sumStatuses(status, statusBonusesFromWeight[playerInfo.weightClass]);
  Object.entries(playerInfo.vocationPath).forEach(([key, path]) => {
    const levelRangeId = key as LevelRangeId;
    const statusDiffByLevelRange = calcStatusByLevelRange(levelRangeId, path);
    status = sumStatuses(status, statusDiffByLevelRange);
  });
  return status;
}

export function evaluationStatus(
  status: Status,
  focusedStatIds: StatId[] = statIds,
): number {
  let score = 0;
  Object.entries(status).forEach(([key, value]) => {
    if (focusedStatIds.includes(key as StatId)) {
      score += key === 'hp' || key === 'st' ? value / 10 : value;
    }
  });
  return score;
}
