import { Vocations } from 'models/vocation';
import { LevelRangeId, getLevelRangeById } from 'models/levelRange';
import Scrollable from 'components/Scrollable';
import { getStatusGrowth, sortByFocusedStatIds } from 'models/statusGrowth';
import { useSelector } from 'react-redux';
import { vocationSelectorSelectors } from 'features/vocation-selector/vocationSelectorSlice';
import StatFocusButtons from './StatFocusButtons';
import VocationSelection from './VocationSelection';

type Props = {
  levelRangeId: LevelRangeId;
};

function VocationSelector(props: Props) {
  const { levelRangeId } = props;
  const { availableVocationIds } = getLevelRangeById(levelRangeId);
  const focusedStatIds = useSelector(
    vocationSelectorSelectors.selectFocusedStatIds,
  );
  const availableVocations = Vocations.filter((vocation) =>
    availableVocationIds.includes(vocation.id),
  );
  const statusGrowths = sortByFocusedStatIds(
    availableVocations.map((vocation) =>
      getStatusGrowth(vocation.id, levelRangeId),
    ),
    focusedStatIds,
  );
  const selections = statusGrowths.map((statusGrowth) => (
    <VocationSelection statusGrowth={statusGrowth} score={statusGrowth.score} />
  ));
  return (
    <>
      <div style={{ height: '10%' }}>
        <StatFocusButtons />
      </div>
      <div style={{ height: '90%' }}>
        <Scrollable>{selections}</Scrollable>
      </div>
    </>
  );
}

export default VocationSelector;
