const router = require('express').Router(); // импортируем модель
const { editUserValidation } = require('../middlewares/validation');

const { getUserInfo, editUser } = require('../controllers/users');

router.get('/me', getUserInfo); // возвращает информацию о пользователе (email и имя)

router.patch('/me', editUserValidation, editUser); // обновляет информацию о пользователе (email и имя)

module.exports = router;
