import jwt from 'jsonwebtoken';
import config from './config.js';
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, config, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;