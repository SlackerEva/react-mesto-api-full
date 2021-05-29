const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not_found_error');
const ValidationError = require('../errors/validation_error');
const AuthError = require('../errors/auth_error');
const CreationError = require('../errors/creation_error');

exports.login = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findUserByCredentials(
    email, password,
  )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })
    .catch(next);
};

exports.getUsers = (req, res) => {
  User.find()
    .then((user) => res.send(user))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new AuthError('Пароль или почта введены некорректно');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        next(new CreationError('Для этого email уже создан пльзователь'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError(err.message));
      }
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => { throw new NotFoundError('Пользователь по заданному id отсутствует в базе'); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};

exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new ValidationError('Введены некорректные данные');
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Пользователь по заданному id отсутствует в базе'); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};

exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new ValidationError('Введены некорректные данные');
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError(`'Пользователь с заданным id отсутствует в базе' ${req.user._id}`); })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};

exports.getMyself = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .orFail(() => { throw new NotFoundError('Пользователь по заданному id отсутствует в базе'); })
    .then((user) => res.send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};
