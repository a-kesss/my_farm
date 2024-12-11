import { Container } from 'react-bootstrap';
import AddAnimalForm from '../ui/AddAnimalForm';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';
import AnimalCard from '../ui/AnimalCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useUser } from '../../UserContext';

export default function AddUserPage() {
  const [animal, setAnimal] = useState([]);
  const { user } = useUser();

  const AllAnimal = async () => {
    const userId = user.id;
    try {
      const response = await axiosInstance.get('/allusers', { params: { userId } });
      setAnimal(response.data);
    } catch (error) {
      console.error('Ошибка сервера:', error);
    }
  };

  useEffect(() => {
    AllAnimal();
  }, []);

  return (
    <>
      <AddAnimalForm />
      <Container style={{ marginTop: '30px' }}>
        <h1>Мои животные :</h1>
      </Container>
      <Container>
        {animal.length === 0 && <h1>У вас нет животных</h1>}
        <Row>
          {animal.map((animal) => (
            <Col key={animal.id} md={3}>
              <AnimalCard key={animal.id} user={animal} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
