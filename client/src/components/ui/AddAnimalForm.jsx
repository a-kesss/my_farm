import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../axiosInstance';
import { useUser } from '../../UserContext';

function AddUserForm() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [error, setError] = useState('');
  const [acces, setAcces] = useState('');
  const [inputs, setInputs] = useState({
    className: '',
    img: '',
    userId: user.id,
  });

  const clearInputs = () => {
    setInputs({
      className: '',
      img: '',
    });
  };

  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { className, img } = inputs;

    if (!className || !img) {
      setError('Пожалуйста, заполните все поля');
      setLoading(false);
      return;
    }
    try {
      const response = await axiosInstance.post('/adduser', inputs);

      if (response.data.success === true) {
        setAcces('Пользователь успешно добавлен');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Пользователь уже существует');
      } else {
        setError('Ошибка сервера');
      }
    } finally {
      setError('');
      setAcces('');
      clearInputs();
      setLoading(false);
    }
  };

  return (
    <>
      <Form>
        {error && <div className="alert alert-danger">{error}</div>}
        {acces && <div className="alert alert-success">{acces}</div>}
        <h1>Добавление животных:</h1>
        <InputGroup style={{ margin: '10px' }}>
          <Form.Control
            placeholder="Дайте название животному"
            type="text"
            name="className"
            onChange={changeHandler}
            value={inputs.className}
          />
        </InputGroup>

        <InputGroup style={{ margin: '10px' }}>
          <Form.Control
            placeholder="Вставьте URL Картинки"
            type="text"
            name="img"
            onChange={changeHandler}
            value={inputs.img}
          />
        </InputGroup>

        <Button onClick={handleSubmit} variant="success" disabled={loading}>
          {loading ? 'Загрузка...' : 'Добавить'}
        </Button>
      </Form>
    </>
  );
}

export default AddUserForm;
