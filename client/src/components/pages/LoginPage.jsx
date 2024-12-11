import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useUser } from '../../UserContext';
import axiosInstance from '../../axiosInstance';

function LoginPage() {
  const { login } = useUser();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, password } = data;

    if (!name || !password) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post('/login', data);

      const { success, user } = response.data;
      
      if (success) {
        login(user);
      }
      if (response.data.message) {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Ошибка сервера');
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Form onSubmit={handleLogin}>
      {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Логин :</Form.Label>
        <Form.Control
          className="w-25"
          type="text"
          name="name"
          onChange={changeHandler}
          value={data.name}
          isInvalid={data.name.length < 0}
        />
        <Form.Control.Feedback type="invalid">
          Пожалуйста, заполните это поле.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль:</Form.Label>
        <Form.Control
          className="w-25"
          type="password"
          name="password"
          onChange={changeHandler}
          value={data.password}
          isInvalid={data.password.length > 0 && data.password.length < 3}
        />
        <Form.Control.Feedback type="invalid">
          Длина пароля должна быть не менее 3 символов
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </Form>
  );
}

export default LoginPage;
