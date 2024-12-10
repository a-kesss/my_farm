const express = require('express');
const { Animal } = require('../../db/models');
const allUsersRouter = express.Router();

allUsersRouter.get('/allusers', async (req, res) => {
  const { userId } = req.query;
  const animals = await Animal.findAll({ where: { userId } });
  res.json(animals);
});

module.exports = allUsersRouter;
