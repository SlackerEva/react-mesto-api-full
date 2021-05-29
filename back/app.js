const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { usersRoutes } = require('./routes/users');
const { cardsRoutes } = require('./routes/cards');
const { middleError } = require('./middlewares/middleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3005, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use(usersRoutes);
app.use(cardsRoutes);

app.use(errorLogger);

app.use((req, res, next) => {
  res.status(404).send({ message: 'Ресурс не найден!' });
  next();
});

app.use(middleError);

async function main() {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  await app.listen(PORT);
}

main();
