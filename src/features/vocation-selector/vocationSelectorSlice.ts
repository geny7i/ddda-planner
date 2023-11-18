import { VOCATION_SELECTOR } from 'constants/sliceKeys';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { StatId } from 'models/status';
import { RootState } from 'src/initializers/store';

export type State = {
  focusedStatIds: StatId[];
};

const initialState: State = {
  focusedStatIds: [],
};

export const slice = createSlice({
  name: VOCATION_SELECTOR,
  initialState,
  reducers: {
    toggleFocusedStatsId: (state: State, { payload }: { payload: StatId }) => {
      // FIXME: 雑すぎる
      const statId = payload;
      if (state.focusedStatIds.includes(statId)) {
        return {
          ...state,
          focusedStatIds: state.focusedStatIds.filter((id) => id !== statId),
        };
      }
      return {
        ...state,
        focusedStatIds: [...state.focusedStatIds, statId],
      };
    },
  },
});

function selectVocationSelectorState(state: RootState): State {
  return state.vocationSelector;
}

const selectFocusedStatIds = createSelector(
  selectVocationSelectorState,
  (state) => state.focusedStatIds,
);

export const vocationSelectorSelectors = {
  selectFocusedStatIds,
};

export const { actions: vocationSelectorActions, reducer } = slice;
