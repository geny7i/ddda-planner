import { VOCATION_PATH } from 'constants/sliceKeys';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getStatusFromCharacterInfo, WeightClass } from 'models/status';
import { VocationId } from 'models/vocation';
import { LevelRangeId, getLevelRangeById } from 'models/levelRange';
import { RootState } from 'src/initializers/store';
import { CharacterInfo } from 'models/playerInfo';

export type State = {
  weightClass: WeightClass;
  pathForOnlyLv1: VocationId[];
  pathForLv10: VocationId[];
  pathForLv100: VocationId[];
  pathForLv200: VocationId[];
};

const initialState: State = {
  weightClass: WeightClass.m,
  pathForOnlyLv1: [],
  pathForLv10: [],
  pathForLv100: [],
  pathForLv200: [],
};

type AddVocationIdPayload = PayloadAction<{
  levelRangeId: LevelRangeId;
  vocationId: VocationId;
  level: number;
}>;
type RemoveVocationIdPayload = PayloadAction<{
  levelRangeId: LevelRangeId;
  vocationId: VocationId;
  level: number;
}>;
type MoveVocationIdPayload = PayloadAction<{
  levelRangeId: LevelRangeId;
  sourceVocationId: VocationId;
  destVocationId: VocationId;
  level: number;
}>;
type PathKeys =
  | 'pathForOnlyLv1'
  | 'pathForLv10'
  | 'pathForLv100'
  | 'pathForLv200';

function getPathKeyFromRangeId(levelRangeId: LevelRangeId): PathKeys {
  switch (levelRangeId) {
    case 'onlyLv1':
      return 'pathForOnlyLv1';
    case 'forLv10':
      return 'pathForLv10';
    case 'forLv100':
      return 'pathForLv100';
    case 'forLv200':
      return 'pathForLv200';
    default:
      throw new Error('invalid levelRangeId');
  }
}

function moveVocationId(
  VocationIds: VocationId[],
  sourceVocationId: VocationId,
  destVocationId: VocationId,
  size: number,
): VocationId[] {
  let moveCount = 0;
  const nextVocationIds = VocationIds.map((vocationId) => {
    if (moveCount < size && vocationId === sourceVocationId) {
      moveCount += 1;
      return destVocationId;
    }
    return vocationId;
  });
  return nextVocationIds;
}

export const slice = createSlice({
  name: VOCATION_PATH,
  initialState,
  reducers: {
    addStep: (state: State, { payload }: AddVocationIdPayload) => {
      const { levelRangeId, vocationId, level } = payload;
      const pathKey = getPathKeyFromRangeId(levelRangeId);
      const levelRange = getLevelRangeById(levelRangeId);
      const rangeLength = levelRange.to - levelRange.from + 1;
      const levelCanAdd = Math.min(level, rangeLength - state[pathKey].length);
      if (levelRange.availableVocationIds.includes(vocationId) === false)
        throw new Error('invalid vocationId');
      if (state[pathKey].length === rangeLength) return state;
      const nextPath = state[pathKey].concat(
        Array(levelCanAdd).fill(vocationId),
      );
      return {
        ...state,
        [pathKey]: nextPath.slice(0, rangeLength),
      };
    },
    removeStep: (state: State, { payload }: RemoveVocationIdPayload) => {
      const { levelRangeId, vocationId, level } = payload;
      const pathKey = getPathKeyFromRangeId(levelRangeId);
      const levelRange = getLevelRangeById(levelRangeId);
      const rangeLength = levelRange.to - levelRange.from + 1;
      const levelCanRemove = Math.min(level, rangeLength);
      let removeCount = 0;
      const nextPath = state[pathKey].filter((vocation) => {
        if (removeCount < levelCanRemove && vocation === vocationId) {
          removeCount += 1;
          return false;
        }
        return true;
      });
      return {
        ...state,
        [pathKey]: nextPath,
      };
    },
    moveStep: (state: State, { payload }: MoveVocationIdPayload) => {
      const { levelRangeId, sourceVocationId, destVocationId, level } = payload;
      const pathKey = getPathKeyFromRangeId(levelRangeId);
      return {
        ...state,
        [pathKey]: moveVocationId(
          state[pathKey],
          sourceVocationId,
          destVocationId,
          level,
        ),
      };
    },
    importFromCharacterInfo: (
      state: State,
      { payload }: PayloadAction<CharacterInfo>,
    ) => {
      const { vocationPath, weightClass } = payload;
      return {
        ...state,
        weightClass,
        pathForOnlyLv1: vocationPath.onlyLv1,
        pathForLv10: vocationPath.forLv10,
        pathForLv100: vocationPath.forLv100,
        pathForLv200: vocationPath.forLv200,
      };
    },
  },
});

function selectPathStepsInfoByLevelRangeId(
  levelRangeId: LevelRangeId,
): (state: RootState) => {
  steps: VocationId[];
  limit: number;
  isFull: boolean;
} {
  return (
    state: RootState,
  ): { steps: VocationId[]; limit: number; isFull: boolean } => {
    const steps = state.vocationPath[getPathKeyFromRangeId(levelRangeId)];
    const levelRange = getLevelRangeById(levelRangeId);
    const limit = levelRange.to - levelRange.from + 1;
    const isFull = steps.length === limit;
    return { steps, limit, isFull };
  };
}

const selectCharacterInfo = createSelector(
  [(state: RootState) => state.vocationPath],
  (vocationPath) => {
    const {
      pathForOnlyLv1,
      pathForLv10,
      pathForLv100,
      pathForLv200,
      weightClass,
    } = vocationPath;
    return {
      vocationPath: {
        onlyLv1: pathForOnlyLv1,
        forLv10: pathForLv10,
        forLv100: pathForLv100,
        forLv200: pathForLv200,
      },
      weightClass,
    };
  },
);

const selectCurrentStatus = createSelector(
  [(state: RootState) => state.vocationPath],
  (vocationPath) => {
    const {
      pathForOnlyLv1,
      pathForLv10,
      pathForLv100,
      pathForLv200,
      weightClass,
    } = vocationPath;
    const playerInfo: CharacterInfo = {
      vocationPath: {
        onlyLv1: pathForOnlyLv1,
        forLv10: pathForLv10,
        forLv100: pathForLv100,
        forLv200: pathForLv200,
      },
      weightClass,
    };
    return getStatusFromCharacterInfo(playerInfo);
  },
);

export const vocationPathSelectors = {
  selectPathStepsInfoByLevelRangeId,
  selectCurrentStatus,
  selectCharacterInfo,
};

export const { actions: vocationPathActions, reducer } = slice;
