const { User } = require('../models');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const { id } = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authMiddleware };
