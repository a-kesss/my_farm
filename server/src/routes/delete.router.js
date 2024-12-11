const deleteRouter = require('express').Router();
const { Animal } = require('../../db/models');

deleteRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Animal.findByPk(id);
    
    await user.destroy();
    res.json({ message: 'Животное успешно удалено' });
  } catch (error) {
    console.error('Ошибка удаления:', error);
    res.status(500)
  }
});

module.exports = deleteRouter;
