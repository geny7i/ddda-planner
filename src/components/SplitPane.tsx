import { FC, useState, useEffect, useCallback } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

// TODO 剥がす

type Props = {
  left: FC;
  right: FC;
};

export default function SplitPane(props: Props) {
  const { left: LeftPane, right: RightPane } = props;
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(0);

  // FIXME 全体的にびみょう
  function calculateWidth() {
    const windowWidth = window.innerWidth;
    return windowWidth * 0.7;
  }
  useEffect(() => {
    setLeftPaneWidth(calculateWidth());
  }, []);

  const handleDrag = useCallback(
    (_: any, data: DraggableData) => {
      setLeftPaneWidth(leftPaneWidth + data.deltaX);
    },
    [leftPaneWidth],
  );

  if (leftPaneWidth === 0) {
    return null;
  }

  return (
    <div className="App" style={{ background: '#aaa' }}>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{ width: leftPaneWidth, minWidth: '50%', background: '#ddd' }}
        >
          <LeftPane />
        </div>
        <Draggable axis="x" position={{ x: 0, y: 0 }} onDrag={handleDrag}>
          <div style={{ cursor: 'col-resize', width: '10px' }}>
            {/* ドラッグハンドラ */}
          </div>
        </Draggable>
        <div style={{ flex: 1, background: '#ccc' }}>
          <RightPane />
        </div>
      </div>
    </div>
  );
}
