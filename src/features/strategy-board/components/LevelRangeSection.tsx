import { VOCATION_SELECTION } from 'constants/dragItemKeys';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  vocationPathActions,
  vocationPathSelectors,
} from 'features/vocation-path/vocationPathSlice';
import { LevelRange } from 'models/levelRange';
import { VocationId, Vocations } from 'models/vocation';
import { Row, Accordion, Badge } from 'react-bootstrap';
import Droppable from 'features/drag-and-drop/components/Droppable';
import { DragItem } from 'models/dragItem';
import VocationStepsCard from './VocationStepsCard';

type Props = {
  levelRange: LevelRange;
};

function LevelRangeSection(props: Props) {
  const { levelRange } = props;
  const dispatch = useDispatch();
  const { steps, isFull } = useSelector(
    vocationPathSelectors.selectPathStepsInfoByLevelRangeId(levelRange.id),
  );

  type StepCountByVocationId = Partial<Record<VocationId, number>>;

  const onDrop = useCallback(
    (item: DragItem<typeof VOCATION_SELECTION>) => {
      const { vocationId, level } = item;
      dispatch(
        vocationPathActions.addStep({
          levelRangeId: levelRange.id,
          vocationId,
          level,
        }),
      );
    },
    [levelRange],
  );

  const vocationsWithCount = useMemo(() => {
    const initial: StepCountByVocationId = {};
    const count: StepCountByVocationId = steps.reduce((acc, step) => {
      acc[step] = (acc[step] || 0) + 1;
      return acc;
    }, initial);
    return Vocations.map((vocation) => ({
      vocation,
      count: count[vocation.id] || 0,
    }));
  }, [steps]);

  const levelRangeLength = levelRange.to - levelRange.from + 1;
  const levelRangeFull = steps.length === levelRangeLength;

  return (
    <div>
      <Accordion.Item eventKey={levelRange.id}>
        <Accordion.Header>
          <span style={{ width: '5.5em' }}>
            <Badge
              className="d-flex justify-content-between w-auto"
              bg="light"
              text="dark"
            >
              <span>Lv</span>
              <span>{`${levelRange.from}~${levelRange.to}`}</span>
            </Badge>
          </span>
          <span className="ms-2" style={{ width: '5.5em' }}>
            <Badge
              className="d-flex justify-content-between w-auto"
              bg={levelRangeFull ? 'primary' : 'secondary'}
            >
              <span>
                {steps.length}/{levelRangeLength}
              </span>
              <span>{levelRangeFull && '\u2713'}</span>
            </Badge>
          </span>
        </Accordion.Header>
        <Droppable
          type={VOCATION_SELECTION}
          onDrop={onDrop}
          disableWith={() => isFull}
        >
          <Accordion.Body style={{ height: '70vh' }}>
            <Row md={{ cols: 3 }} className="g-4">
              {vocationsWithCount.map(
                (vocationWithCount) =>
                  !!vocationWithCount.count && (
                    <VocationStepsCard
                      key={vocationWithCount.vocation.id}
                      vocation={vocationWithCount.vocation}
                      stepCount={vocationWithCount.count}
                      levelRangeId={levelRange.id}
                    />
                  ),
              )}
            </Row>
          </Accordion.Body>
        </Droppable>
      </Accordion.Item>
    </div>
  );
}

export default LevelRangeSection;
