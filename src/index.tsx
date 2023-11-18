import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DndCustomDragLayer from 'features/drag-and-drop/components/DragLayer';
import App from './App';
import { store } from './initializers/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ReduxProvider store={store}>
        <App />
        <DndCustomDragLayer />
      </ReduxProvider>
    </DndProvider>
  </React.StrictMode>,
);
