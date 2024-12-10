import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AnimalFarmCard from '../ui/AnimalFarmCard';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FarmPage() {
  const [animals, setAnimal] = useState([]);
  const { id } = useParams();

  const AllAnimal = async () => {
    const userId = id;
    try {
      const response = await axiosInstance.get('/allusers', { params: { userId } });
      console.log(response.data);

      setAnimal(response.data);
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error);
    }
  };

  useEffect(() => {
    AllAnimal();
  }, []);

  return (
    <>
      <div>ID фермы: {id}</div>
      <Container>
        {animals.length === 0 && <h1>У пользователя нет животных</h1>}
        <Row>
          {animals.map((animal) => (
            <Col key={animal.id} md={3}>
              <AnimalFarmCard key={animal.id} animal={animal} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
