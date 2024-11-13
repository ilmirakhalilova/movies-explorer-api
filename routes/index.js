const router = require('express').Router();
const users = require('./user');
const movies = require('./movie');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', createUserValidation, createUser); // создаёт пользователя с переданными в теле email, password и name

router.post('/signin', loginValidation, login); // проверяет переданные в теле почту и пароль и возвращает JWT

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.use('/*', (req, res, next) => next(new NotFoundError('Страница не существует.')));

module.exports = router;
