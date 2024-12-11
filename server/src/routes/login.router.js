const loginRouter = require('express').Router();
const { User } = require('../../db/models');
const dotenv = require('dotenv');

dotenv.config();

loginRouter.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const plainet = await User.findOne({ where: { name } });
    if (!plainet) {
      return res.json({ success: false, message: 'Пользователь не найден' });
    }

    const user = plainet.get({ plain: true });

    if (user.password === Number(password)) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

module.exports = loginRouter;
