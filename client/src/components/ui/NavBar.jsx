import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink as RouterNavLink } from 'react-router';
import { useUser } from '../../UserContext';

export default function NavBar() {
  const { user, logout } = useUser();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Admin Panel</Navbar.Brand>
          <Nav className="justify-content-end">
            {user ? (
              <>
                <Nav.Link as={RouterNavLink} to="/adduser">
                  Ферма
                </Nav.Link>
                <Nav.Link as={RouterNavLink} to="/profile">
                  {user.name || 'Пользователь'}
                </Nav.Link>
                <Nav.Link onClick={logout}>Выход</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={RouterNavLink} to="/registration">
                  Регистрация
                </Nav.Link>
                <Nav.Link as={RouterNavLink} to="/login">
                  Вход
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
