import { useEffect, useRef, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const styles: React.CSSProperties = {
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
  transition: 'width 0.5s ease',
  zIndex: 500,
};

type Props = {
  children: React.ReactNode;
};

function ActiveNavLink(props: { label: string; to: string }) {
  const { label, to } = props;
  const location = useLocation();

  function checkActive(path: string) {
    return location.pathname === path;
  }

  return (
    <Nav.Link as={Link} to={to} active={checkActive(to)}>
      {label}
    </Nav.Link>
  );
}

export default function ContainerWithSidebar(props: Props) {
  const { children } = props;
  const [opened, setOpened] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <>
      <div style={{ marginLeft: '50px' }}>{children}</div>
      <Navbar
        ref={sidebarRef}
        bg="light"
        expand="lg"
        className="flex-column"
        style={{ ...styles, width: opened ? '250px' : '50px' }}
      >
        {!opened && (
          <button
            type="button"
            aria-label="Open Sidebar"
            onClick={() => setOpened(true)}
            style={{ background: 'none', border: 'none' }}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        {opened && (
          <button
            type="button"
            aria-label="Close Sidebar"
            onClick={() => setOpened(false)}
            style={{ background: 'none', border: 'none' }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        {opened && (
          <Nav className="flex-column">
            <ActiveNavLink label="Board" to="/" />
            <ActiveNavLink label="Chart" to="/chart" />
          </Nav>
        )}
      </Navbar>
    </>
  );
}
