const adduserRouter = require('express').Router();
const { Animal } = require('../../db/models');

adduserRouter.post('/adduser', async (req, res) => {
  const { className, img, userId } = req.body;

  try {
    const user = await Animal.create({
      className,
      img,
      userId,
    });

    res.status(201).json({ success: true, message: 'Животное успешно добавлено!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = adduserRouter;
