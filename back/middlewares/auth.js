const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Необходима авторизация' });
    }

    const token = authorization.replace('Bearer ', '');

    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
