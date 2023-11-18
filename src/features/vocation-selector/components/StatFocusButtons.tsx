import { StatId, statIds } from 'models/status';
import { Button, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  vocationSelectorSelectors,
  vocationSelectorActions,
} from '../vocationSelectorSlice';

function FocusButton(props: { statId: StatId }) {
  const dispatch = useDispatch();
  const { statId } = props;
  const focusedStatIds = useSelector(
    vocationSelectorSelectors.selectFocusedStatIds,
  );

  const handleClick = useCallback(() => {
    dispatch(vocationSelectorActions.toggleFocusedStatsId(statId));
  }, [statId]);

  return (
    <Button
      onClick={handleClick}
      variant={focusedStatIds.includes(statId) ? 'primary' : 'secondary'}
      style={{ width: '100%' }}
      size="sm"
    >
      {statId}
    </Button>
  );
}

function StatFocusButtons() {
  return (
    <Stack direction="horizontal" className="align-items-end h-100">
      {statIds.map((statId) => (
        <div style={{ flex: 1, padding: '5px' }}>
          <FocusButton statId={statId} />
        </div>
      ))}
    </Stack>
  );
}

export default StatFocusButtons;
