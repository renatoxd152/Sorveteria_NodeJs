import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../model/usuarioModel.js';
import config from '../utils/config.js';
const usuario = express();
usuario.use(express.json());

usuario.post('/cadastrar', async (req, res) => {
    try {
      const { login, senha } = req.body;
  
      const user = await Usuario.findOne({
        where: { login: login},
      });
  
      if (user) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }
  
     
      const hashedPassword = await bcrypt.hash(senha, 10);
  
      // Cria um novo usuário
      const newUser = await Usuario.create({ login: login, senha: hashedPassword });
  
      // Salva o novo usuário no banco de dados
      await newUser.save();
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });


usuario.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Encontrar o usuário pelo nome de usuário
    const user = await Usuario.findOne({
        where: { login: login},
      });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    
    const token = jwt.sign({ userId: user.id }, config, { expiresIn: '1h' });

    
    res.json({token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});


export default usuario;