const express = require('express');
const updatedRouter = express.Router();
const { Animal } = require('../../db/models');

updatedRouter.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { className, img } = req.body;

    const user = await Animal.findByPk(userId);

    user.className = className;
    user.img = img;
    user.updatedAt = new Date();

    await user.save();

    res.json({ message: 'Животное обновлено' });
  } catch (error) {
    console.error('Ошибка обновления:', error);
    res.status(500)
  }
});

module.exports = updatedRouter;
