import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { vocationPathActions } from 'features/vocation-path/vocationPathSlice';
import { parseCode } from 'utils/restoreCodeUtils';

export default function InitializeFromRestoreParameter() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const restoreCode = queryParams.get('c');
    if (restoreCode) {
      const parsed = parseCode(restoreCode);
      dispatch(vocationPathActions.importFromCharacterInfo(parsed));
    }
    navigate('/');
  }, []);

  return <div>Initializing...</div>;
}
