import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import axiosInstance from '../../axiosInstance';
import { Button, Form } from 'react-bootstrap';

function UserCard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleDelete = async () => {
    await axiosInstance.delete(`/delete/${user.id}`);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const changeHandler = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/update/${user.id}`, formData);
    setIsEditing(false);
  };

  return (
    <Card style={{ marginTop: '30px', width: '300px', height: '400px' }}>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Card.Body>
            <Form.Group controlId="formName">
              <Form.Label>img</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={formData.img}
                onChange={changeHandler}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                name="className"
                value={formData.className}
                onChange={changeHandler}
              />
            </Form.Group>
          </Card.Body>
          <Card.Body>
            <Button type="submit">Сохранить</Button>
            <Button variant="secondary" onClick={handleEditClick}>
              Отмена
            </Button>
          </Card.Body>
        </form>
      ) : (
        <>
          <Card.Body>
            <Card.Img variant="top" src={formData.img} />
            <Card.Title>{user.className}</Card.Title>
          </Card.Body>
          <Card.Body>
            <Button
              style={{
                color: 'inherit',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: '0',
                margin: '7px',

                fontSize: 'inherit',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
              onClick={handleEditClick}
            >
              Редактировать
            </Button>
            <Button
              style={{
                color: 'inherit',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                padding: '0',
                margin: '7px',

                fontSize: 'inherit',
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </Card.Body>
        </>
      )}
    </Card>
  );
}

export default UserCard;
