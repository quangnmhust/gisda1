
import './header.css';
import { Button } from '@mui/material';
import { ApiContext } from '../../context/ApiProvider';
import { useContext } from 'react';

const LogOut = () => {
  const { logout } = useContext(ApiContext)

  return (
    <nav className="navbar-container">
      <Button onClick={logout} className="navbar-logout">
          Log out
      </Button>
    </nav>
  );
};

export default LogOut;
