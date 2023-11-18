import { useDispatch, useSelector } from 'react-redux';
import { Accordion } from 'react-bootstrap';
import { LevelRangeId, getAllLevelRanges } from 'models/levelRange';
import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';
import { useCallback } from 'react';
import {
  strategyBoardActions,
  strategyBoardSelectors,
} from '../strategyBoardSlice';
import LevelRangeSection from './LevelRangeSection';

function VocationDeck() {
  const dispatch = useDispatch();

  const activeKey = useSelector(
    strategyBoardSelectors.selectActiveLevelRangeId,
  );

  const handleSelectLevelRange = useCallback((key: AccordionEventKey) => {
    if (!key) return;
    dispatch(strategyBoardActions.setActiveLevelRangeId(key as LevelRangeId));
  }, []);

  return (
    <div className="w-100 h-100">
      <Accordion activeKey={activeKey} onSelect={handleSelectLevelRange}>
        {getAllLevelRanges().map((levelRange) => (
          <LevelRangeSection levelRange={levelRange} />
        ))}
      </Accordion>
    </div>
  );
}

export default VocationDeck;
