/* eslint-disable no-alert */
import StatusTable from 'components/StatusTable';
import { vocationPathSelectors } from 'features/vocation-path/vocationPathSlice';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { serializeParams } from 'utils/restoreCodeUtils';

function StatusPreview() {
  const restoreParam = useSelector(vocationPathSelectors.selectCharacterInfo);
  const handleClickShare = useCallback(async () => {
    const restoreUrl = `${window.location.origin}/ddda-planner/#restore`;
    const restoreCode = serializeParams(restoreParam);
    const shareUrl = `${restoreUrl}?c=${restoreCode}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('URLをクリップボードにコピーしました。');
    } catch (err) {
      alert('エラーが発生しました。');
    }
  }, [restoreParam]);
  const status = useSelector(vocationPathSelectors.selectCurrentStatus);
  return (
    <Card>
      <Card.Header as="h5">
        Character
        <FontAwesomeIcon
          onClick={handleClickShare}
          style={{ marginLeft: '.7em' }}
          icon={faShareNodes}
        />
      </Card.Header>
      <Card.Body>
        <StatusTable status={status} />
      </Card.Body>
    </Card>
  );
}

export default StatusPreview;
