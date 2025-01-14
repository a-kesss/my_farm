import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink as RouterNavLink } from 'react-router';

function FarmCard(farms) {
  return (
    <Card style={{ width: '200px', height: '100px' }}>
      <Card.Body>
        <Card.Title>{farms.user.name}'s Farm</Card.Title>
        <Button as={RouterNavLink} to={`/farm/${farms.user.id}`}>
          Зайти в гости
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FarmCard;
