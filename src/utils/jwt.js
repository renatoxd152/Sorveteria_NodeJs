import jwt from 'jsonwebtoken';
import config from './config.js';
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, config, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;