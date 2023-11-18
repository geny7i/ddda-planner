import { Status, statIds } from 'models/status';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { vocationSelectorSelectors } from '../vocationSelectorSlice';

type Props = {
  status: Status;
  score: number;
};

export default function StatusTableWithScore(props: Props) {
  const { status, score } = props;

  const focusedStatIds = useSelector(
    vocationSelectorSelectors.selectFocusedStatIds,
  );

  return (
    <Table striped bordered>
      <thead>
        <tr>
          {statIds.map((statId) => (
            <th
              className={focusedStatIds.includes(statId) ? 'text-primary' : ''}
              key={statId}
            >
              {statId}
            </th>
          ))}
          <th>score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {statIds.map((statId) => (
            <td key={statId}>{status[statId]}</td>
          ))}
          <td>{score}</td>
        </tr>
      </tbody>
    </Table>
  );
}
