import SplitPane from 'components/SplitPane';
import Navbar from 'components/Navbar';
import StatusPreview from 'features/status-preview/components/StatusPreview';
import VocationSelector from 'features/vocation-selector/components/VocationSelector';
import { LevelRangeId } from 'models/levelRange';
import { Container } from 'react-bootstrap';

function rightPane() {
  const levelRangeId = LevelRangeId.forLv100;

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

function leftPane() {
  return <Container>TODO</Container>;
}

function LevelingChart() {
  return (
    <>
      <Navbar />
      <SplitPane left={leftPane} right={rightPane} />
    </>
  );
}

export default LevelingChart;
