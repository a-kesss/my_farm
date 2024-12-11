const express = require('express');
const { User } = require('../../db/models');
const allFarmsRouter = express.Router();

allFarmsRouter.get('/allfarm', async (req, res) => {
  const user = await User.findAll();
  res.json(user);
});

module.exports = allFarmsRouter;
