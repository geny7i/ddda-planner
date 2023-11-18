import { DRAG_AND_DROP } from 'constants/sliceKeys';
import { DragItem, DragItemKey } from 'models/dragItem';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/initializers/store';

export type State = {
  draggingItem?: DragItem<DragItemKey>;
};

const initialState: State = {
  draggingItem: undefined,
};

const slice = createSlice({
  name: DRAG_AND_DROP,
  initialState,
  reducers: {
    setDraggingItem: (
      state: State,
      { payload }: { payload: DragItem<DragItemKey> },
    ) => ({ ...state, draggingItem: payload }),
    clearDraggingItem: (state: State) => ({
      ...state,
      draggingItem: undefined,
    }),
  },
});

function selectDrAndDropState(state: RootState): State {
  return state.dragAndDrop;
}

const selectDraggingItem = createSelector(
  selectDrAndDropState,
  (state) => state.draggingItem,
);

export const dragAndDropSelectors = {
  selectDraggingItem,
};

export const { actions: dragAndDropActions, reducer } = slice;
