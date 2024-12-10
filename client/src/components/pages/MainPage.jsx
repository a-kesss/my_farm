import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FarmCard from '../ui/FarmCard';
import axiosInstance from '../../axiosInstance';

export default function MainPage() {
  const [farms, setFarms] = useState([]);

  const AllFarms = async () => {
    try {
      const response = await axiosInstance.get('/allfarm');
      console.log(response.data);

      setFarms(response.data);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  useEffect(() => {
    AllFarms();
  }, []);

  return (
    <>
      <Container style={{ marginTop: '30px' }}>
        <h1>Все фермы:</h1>
      </Container>
      <Container style={{ marginTop: '30px' }}>
        <Row>
          {farms.map((farm) => (
            <Col key={farm.id} md={2}>
              <FarmCard key={farm.id} user={farm} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
