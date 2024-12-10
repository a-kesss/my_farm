const registRouter = require('express').Router();
const { User } = require('../../db/models');

registRouter.post('/registration', async (req, res) => {
  const { name, password } = req.body;

  console.log(req.body);
  try {
    // Проверка существования пользователя
    const existingUser = await User.findOne({ where: { name } });

    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь уже существует' });
    }

    // Создание нового пользователя
    const user = await User.create({
      name,
      password,
    });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = registRouter;
