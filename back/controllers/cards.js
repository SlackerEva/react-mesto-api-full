const Card = require('../models/card');
const NotFoundError = require('../errors/not_found_error');
const ValidationError = require('../errors/validation_error');
const ForbiddenError = require('../errors/forbidden_error');

exports.getCards = (req, res) => {
  Card.find()
    .then((card) => res.send(card))
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const {
    name, link, likes, createdAt,
  } = req.body;
  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      }
      next(err);
    });
};

exports.deleteCardsById = (req, res, next) => {
  const userId = req.user._id;
  Card.findById(req.params.id)
    .orFail(new NotFoundError('Карточка с таким id отсутствует в базе'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Вы не можете удалить эту карточку!');
      }
      Card.findByIdAndRemove(req.params.id)
        .then((data) => res.send(data))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};

exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Карточка с таким id отсутствует в базе'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};

exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError('Карточка с таким id отсутствует в базе'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Введены некорректные данные'));
      }
      next(err);
    });
};
