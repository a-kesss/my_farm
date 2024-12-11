import Card from 'react-bootstrap/Card';

export default function AnimalFarmCard({ animal }) {
  return (
    <Card style={{ marginTop: '30px', width: '18rem' }}>
      <Card.Body>
        <Card.Img
          style={{ width: '200px', height: '200px' }}
          variant="top"
          src={animal.img}
        />
        <Card.Title>{animal.className}</Card.Title>
      </Card.Body>
    </Card>
  );
}
