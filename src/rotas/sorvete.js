import express from 'express';
import Sorvete from '../model/sorveteModel.js';
const sorvete = express();
sorvete.use(express.json());

sorvete.get('/sorvetes', async (req, res) => {
  try {
    
    const sorvetesDoBanco = await Sorvete.findAll();
    
    const mensagem = sorvetesDoBanco.map(sorvete => ({
      id: sorvete.id,
      nome: sorvete.nome,
      quantidade: sorvete.quantidade,
    }));

    res.status(200).json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});


sorvete.post('/sorvetes', async (req, res) => {
    try {
      const { nome, quantidade } = req.body;
  
      const novoSorvete = await Sorvete.create({ nome, quantidade });
        
      res.status(201).json({
        id: novoSorvete.id,
        nome: novoSorvete.nome,
        quantidade: novoSorvete.quantidade,
      });

    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  
  sorvete.delete('/sorvetes/:id', async (req, res) => {
    try {
      const sorveteId = req.params.id;
  
      const sorveteToDelete = await Sorvete.findByPk(sorveteId);
      if (!sorveteToDelete) {
        return res.status(404).json({ erro: 'Sorvete não encontrado' });
      }
  
      // Delete the sorvete
      await sorveteToDelete.destroy();
  
      return res.status(200).json({ mensagem: 'Sorvete excluído com sucesso' });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  

  sorvete.put('/sorvetes/:id', async (req, res) => {
    try {
      const sorveteId = req.params.id;
      const { nome, quantidade } = req.body;
  
      const sorveteToUpdate = await Sorvete.findByPk(sorveteId);
      if (!sorveteToUpdate) {
        return res.status(404).json({ erro: 'Sorvete não encontrado' });
      }
  
      sorveteToUpdate.nome = nome;
      sorveteToUpdate.quantidade = quantidade;
  
      await sorveteToUpdate.save();
  
      res.status(200).json({
        id: sorveteToUpdate.id,
        nome: sorveteToUpdate.nome,
        quantidade: sorveteToUpdate.quantidade,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });

  
export default sorvete;
