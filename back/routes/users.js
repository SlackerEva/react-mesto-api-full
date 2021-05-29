const express = require('express');
const {
  getUsers, getUserById, patchUser, patchUserAvatar, getMyself,
} = require('../controllers/users');

const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);
usersRoutes.get('/users/me', getMyself);
usersRoutes.get('/users/:id', getUserById);
usersRoutes.patch('/users/me', patchUser);
usersRoutes.patch('/users/me/avatar', patchUserAvatar);

exports.usersRoutes = usersRoutes;
