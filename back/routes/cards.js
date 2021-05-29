const express = require('express');
const {
  getCards, deleteCardsById, createCard, putLike, deleteLike,
} = require('../controllers/cards');

const cardsRoutes = express.Router();

cardsRoutes.get('/cards', getCards);
cardsRoutes.delete('/cards/:id', deleteCardsById);
cardsRoutes.post('/cards', express.json(), createCard);
cardsRoutes.put('/cards/:id/likes', putLike);
cardsRoutes.delete('/cards/:id/likes', deleteLike);

exports.cardsRoutes = cardsRoutes;
