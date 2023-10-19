const router = require('express').Router(); // импортируем модель
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const { getUsersMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getUsersMovies); // возвращает все сохранённые текущим пользователем фильмы
router.post('/', createMovieValidation, createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.delete('/:_id', deleteMovieValidation, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
