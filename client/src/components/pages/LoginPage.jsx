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
      console.log(response.data);

      const { success, user } = response.data;

      if (success) {
        login(user);
      } else {
        setError('Неправильный пароль или логин');
      }
    } catch (error) {
      console.error(error);
      setError('Ошибка сервера. Попробуйте позже!');
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
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль:</Form.Label>
        <Form.Control
          className="w-25"
          type="password"
          name="password"
          onChange={changeHandler}
          value={data.password}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </Form>
  );
}

export default LoginPage;
