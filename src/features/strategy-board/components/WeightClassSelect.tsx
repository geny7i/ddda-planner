import { WEIGHT_CLASSES, WeightClass } from 'models/status';
import { useCallback } from 'react';
import { Button, ButtonGroup, Card, CardBody, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  vocationPathActions,
  vocationPathSelectors,
} from 'features/vocation-path/vocationPathSlice';

function SelectButton(props: { weightClass: WeightClass; active: boolean }) {
  const { weightClass, active } = props;
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(vocationPathActions.setWeightClass(weightClass));
  }, [weightClass]);
  return (
    <Button variant={active ? 'primary' : 'secondary'} onClick={onClick}>
      {weightClass.toUpperCase()}
    </Button>
  );
}

export default function WeightClassSelect() {
  const currentWeightClass = useSelector(
    vocationPathSelectors.selectWeightClass,
  );
  return (
    <Card>
      <CardBody>
        <Form.Label className="me-3">Weight</Form.Label>
        <ButtonGroup aria-label="Weight class">
          {Object.values(WEIGHT_CLASSES).map((weightClass) => (
            <SelectButton
              weightClass={weightClass}
              key={weightClass}
              active={currentWeightClass === weightClass}
            />
          ))}
        </ButtonGroup>
      </CardBody>
    </Card>
  );
}
