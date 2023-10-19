const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_URL } = require('./utils/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { rateLimit } = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use(requestLogger); // подключаем логгер запросов
app.use(helmet());
app.use(rateLimit);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  autoIndex: true,
});

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT);
