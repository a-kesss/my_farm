const express = require('express');
const updatedRouter = express.Router();
const { Animal } = require('../../db/models');

updatedRouter.put('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { className, img } = req.body;

    console.log(req.body);

    const user = await Animal.findByPk(userId);
    console.log(user);

    user.className = className;
    user.img = img;
    user.updatedAt = new Date();

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = updatedRouter;
