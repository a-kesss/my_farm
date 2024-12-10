import { Outlet } from 'react-router';
import Navbar from '../src/components/ui/NavBar';
import { Col, Container, Row } from 'react-bootstrap';

export default function Layout() {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar />
        </Col>
      </Row>
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
