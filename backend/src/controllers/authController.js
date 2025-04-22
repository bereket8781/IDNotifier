const jwt    = require('jsonwebtoken');
const config = require('../config');
const User   = require('../models/User');

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
}

module.exports = { login };