import { Status, statIds } from 'models/status';
import { Table } from 'react-bootstrap';

type Props = {
  status: Status;
};

export default function StatusTable(props: Props) {
  const { status } = props;

  return (
    <Table striped bordered>
      <thead>
        <tr>
          {statIds.map((statId) => (
            <th key={statId}>{statId}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {statIds.map((statId) => (
            <td key={statId}>{status[statId]}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
}
