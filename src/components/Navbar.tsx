import { useCallback } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeKey = location.pathname || '/';

  const handleSelect = useCallback(
    (key: string | null) => key && navigate(key),
    [navigate],
  );

  return (
    <Tabs activeKey={activeKey} className="mb-3" onSelect={handleSelect}>
      <Tab eventKey="/" title="Board" />
      <Tab eventKey="/chart" title="Chart" />
    </Tabs>
  );
}

export default Navbar;
