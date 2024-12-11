const registRouter = require('express').Router();
const { User } = require('../../db/models');

registRouter.post('/registration', async (req, res) => {
  const { name, password } = req.body;

  try {
    const plainet = await User.findOne({ where: { name } });
    if (plainet) {
      return res.json({ success: false, message: 'Пользователь уже зарегестрирован' });
    }

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
