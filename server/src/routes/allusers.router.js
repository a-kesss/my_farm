const express = require('express');
const { Animal } = require('../../db/models');
const allUsersRouter = express.Router();
const { User } = require('../../db/models');

allUsersRouter.get('/allusers', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }
    const animals = await Animal.findAll({ where: { userId } });
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500)
  }
});

module.exports = allUsersRouter;
