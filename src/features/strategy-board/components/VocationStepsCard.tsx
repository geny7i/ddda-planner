import { VOCATION_STACK } from 'constants/dragItemKeys';
import Draggable from 'features/drag-and-drop/components/Draggable';
import Droppable from 'features/drag-and-drop/components/Droppable';
import { DragItem } from 'models/dragItem';
import { Vocation } from 'models/vocation';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { vocationPathActions } from 'features/vocation-path/vocationPathSlice';
import { LevelRangeId } from 'models/levelRange';
import { useCallback } from 'react';

type Props = {
  levelRangeId: LevelRangeId;
  vocation: Vocation;
  stepCount: number;
};

function VocationStepsCard(props: Props) {
  const { vocation, stepCount, levelRangeId } = props;
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (item: DragItem<typeof VOCATION_STACK>) => {
      if (item.vocationId !== vocation.id) {
        dispatch(
          vocationPathActions.moveStep({
            sourceVocationId: item.vocationId,
            destVocationId: vocation.id,
            levelRangeId,
            level: item.level,
          }),
        );
      }
    },
    [vocation],
  );

  const onClickAdd = useCallback(() => {
    dispatch(
      vocationPathActions.addStep({
        levelRangeId,
        vocationId: vocation.id,
        level: 1,
      }),
    );
  }, [vocation]);

  const onClickRemove = useCallback(() => {
    dispatch(
      vocationPathActions.removeStep({
        levelRangeId,
        vocationId: vocation.id,
        level: 1,
      }),
    );
  }, [vocation]);

  const disabledWith = useCallback(
    (item: DragItem<typeof VOCATION_STACK>) => item.vocationId === vocation.id,
    [vocation],
  );

  return (
    <Draggable
      item={{ type: VOCATION_STACK, vocationId: vocation.id, level: 1 }}
    >
      <Droppable
        type={VOCATION_STACK}
        onDrop={onDrop}
        disableWith={disabledWith}
      >
        <Card>
          <Card.Header>{vocation.id}</Card.Header>
          <Card.Body>
            <Card.Title>{vocation.id}</Card.Title>
            <Card.Text>
              {stepCount}
              <Button
                onClick={onClickAdd}
                variant="primary"
                size="sm"
                className="ms-2"
              >
                ▲
              </Button>
              <Button
                onClick={onClickRemove}
                variant="primary"
                size="sm"
                className="ms-2"
              >
                ▼
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </Droppable>
    </Draggable>
  );
}

export default VocationStepsCard;
