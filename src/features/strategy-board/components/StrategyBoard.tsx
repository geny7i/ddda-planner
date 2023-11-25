import SplitPane from 'components/SplitPane';
import VocationSelector from 'features/vocation-selector/components/VocationSelector';
import StatusPreview from 'features/status-preview/components/StatusPreview';
import { useSelector } from 'react-redux';
import { strategyBoardSelectors } from 'features/strategy-board/strategyBoardSlice';
import ContainerWithSidebar from 'components/ContainerWithSidebar';
import VocationDeck from './VocationDeck';

function rightPane() {
  const levelRangeId = useSelector(
    strategyBoardSelectors.selectActiveLevelRangeId,
  );

  return (
    <>
      <div className="h-25">
        <StatusPreview />
      </div>
      <div className="h-75">
        <VocationSelector levelRangeId={levelRangeId} />
      </div>
    </>
  );
}

function StrategyBoard() {
  return (
    <ContainerWithSidebar>
      <SplitPane left={VocationDeck} right={rightPane} />
    </ContainerWithSidebar>
  );
}

export default StrategyBoard;
