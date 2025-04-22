const jwt    = require('jsonwebtoken');
const config = require('../config');

/**
 * Protect routes by verifying a JWT in the Authorization header.
 * If valid, attaches decoded payload to req.user; otherwise rejects.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Must be in form "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    // Attach user info for later use
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;