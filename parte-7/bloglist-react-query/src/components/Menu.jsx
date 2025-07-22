import { Link } from 'react-router-dom';
import { logoutUser, useUserDispatch } from '../reducers/UserContextReducer';
import { Button } from '../styles';

const Menu = ({ loggedUser }) => {
  const userDispatch = useUserDispatch();

  const padding = {
    paddingRight: 10,
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2em',
  };

  const navStyling = {
    backgroundColor: '#67717aff',
    padding: '10px',
    borderBottom: '1px solid #dee2e6',
  };

  return (
    <nav style={navStyling}>
      <Link style={padding} to={'/'}>
        blogs
      </Link>
      <Link style={padding} to={'/users'}>
        users
      </Link>
      <Link style={padding}>
        {loggedUser.name} logged in{' '}
        <Button variant="danger" onClick={() => logoutUser(userDispatch)}>
          logout
        </Button>
      </Link>
    </nav>
  );
};

export default Menu;
