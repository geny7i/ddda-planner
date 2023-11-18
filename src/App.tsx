import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DRAG_ITEM_KEYS from 'constants/dragItemKeys';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LevelingPlan from 'features/leveling-chart/components/LevelingChart';
import StrategyBoard from 'features/strategy-board/components/StrategyBoard';
import { useDrop } from 'react-dnd';

function Mobile() {
  return <div className="App">mobile</div>;
}

function App() {
  const [, drop] = useDrop({
    accept: Object.keys(DRAG_ITEM_KEYS),
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        // ドロップエリア外にドロップした場合
      }
    },
  });
  return (
    <div ref={drop}>
      <Router>
        <Routes>
          <Route path="/" element={<StrategyBoard />} />
          <Route path="/chart" element={<LevelingPlan />} />
          <Route path="/mobile" element={<Mobile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
