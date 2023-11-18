import { STRATEGY_BOARD } from 'constants/sliceKeys';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { LevelRangeId } from 'models/levelRange';
import { RootState } from 'src/initializers/store';

export type State = {
  activeLevelRangeId: LevelRangeId;
};

const initialState: State = {
  activeLevelRangeId: LevelRangeId.forLv10,
};

export const slice = createSlice({
  name: STRATEGY_BOARD,
  initialState,
  reducers: {
    setActiveLevelRangeId: (
      state: State,
      { payload }: { payload: LevelRangeId },
    ) => ({
      ...state,
      activeLevelRangeId: payload,
    }),
  },
});

function selectStrategyBoardState(state: RootState): State {
  return state.strategyBoard;
}

const selectActiveLevelRangeId = createSelector(
  selectStrategyBoardState,
  (state) => state.activeLevelRangeId,
);

export const strategyBoardSelectors = { selectActiveLevelRangeId };
export const { actions: strategyBoardActions, reducer } = slice;
