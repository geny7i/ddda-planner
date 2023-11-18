import { configureStore } from '@reduxjs/toolkit';
import { reducer as vocationPath } from 'features/vocation-path/vocationPathSlice';
import { reducer as strategyBoard } from 'features/strategy-board/strategyBoardSlice';
import { reducer as vocationSelector } from 'features/vocation-selector/vocationSelectorSlice';
import { reducer as dragAndDrop } from 'features/drag-and-drop/dragAndDropSlice';

export const store = configureStore({
  reducer: {
    vocationPath,
    strategyBoard,
    vocationSelector,
    dragAndDrop,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
