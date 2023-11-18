import StatusTable from 'components/StatusTable';
import { vocationSelectors } from 'features/vocation-path/vocationPathSlice';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function StatusPreview() {
  const status = useSelector(vocationSelectors.selectCurrentStatus);
  return (
    <Card>
      <Card.Header as="h5">Character</Card.Header>
      <Card.Body>
        <StatusTable status={status} />
      </Card.Body>
    </Card>
  );
}

export default StatusPreview;
