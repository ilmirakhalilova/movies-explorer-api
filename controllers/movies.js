const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const IncorrectDataError = require('../errors/incorrect-data-error');

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getUsersMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((next));
};

// создаёт фильм с переданными в теле country, director, duration,
// year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании карточки фильма.'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден среди сохраненных.');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещен.');
      }
      Movie.deleteOne(movie)
        .then(res.send(movie))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Переданы некорректные данные при удалении карточки фильма.'));
      } else {
        next(err);
      }
    });
};
