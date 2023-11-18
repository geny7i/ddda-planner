import { VOCATION_SELECTION } from 'constants/dragItemKeys';
import Card from 'react-bootstrap/Card';
import VocationIcon from 'components/VocationIcon';
import { Button, Container, Row, Stack } from 'react-bootstrap';
import { StatusGrowth } from 'models/statusGrowth';
import StatusTableWithScore from 'features/vocation-selector/components/StatusTableWithScore';
import Draggable from 'features/drag-and-drop/components/Draggable';

function VocationSelection(props: {
  statusGrowth: StatusGrowth;
  score: number;
}) {
  const { statusGrowth, score } = props;
  const { vocationId, status } = statusGrowth;
  return (
    <Draggable item={{ type: VOCATION_SELECTION, vocationId, level: 1 }}>
      <Card key={vocationId}>
        <Card.Body>
          <Container>
            <Row>
              <Stack className="pb-2" direction="horizontal" gap={2}>
                <VocationIcon vocationId={vocationId} size="sm" />
                <div>{vocationId}</div>
                <Draggable
                  item={{ type: VOCATION_SELECTION, vocationId, level: 10 }}
                  className="ms-auto"
                >
                  <Button>x10</Button>
                </Draggable>
                <Draggable
                  item={{ type: VOCATION_SELECTION, vocationId, level: 100 }}
                >
                  <Button>x100</Button>
                </Draggable>
              </Stack>
            </Row>
            <Row>
              <StatusTableWithScore status={status} score={score} />
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Draggable>
  );
}

export default VocationSelection;
