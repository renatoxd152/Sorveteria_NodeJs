import express from 'express';
import ItemCompra from '../model/itensCompraModel.js';
import Sorvete from '../model/sorveteModel.js';
import verifyToken from '../utils/jwt.js';
const sorvete = express();
sorvete.use(express.json());

sorvete.get('/sorvetes',verifyToken, async (req, res) => {
  try {
    
    const sorvetesDoBanco = await Sorvete.findAll();
    
    const mensagem = sorvetesDoBanco.map(sorvete => ({
      id: sorvete.id,
      nome: sorvete.nome,
      quantidade: sorvete.quantidade,
      preco:sorvete.preco
    }));

    res.status(200).json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

sorvete.get('/sorvete/nome/:id', verifyToken, async (req, res) => {
  try {
    const sorveteId = req.params.id;

    const sorveteEncontrado = await Sorvete.findByPk(sorveteId, {
      attributes: ['nome']
    });

    if (!sorveteEncontrado) {
      return res.status(404).json({ erro: 'Sorvete não encontrado' });
    }

    res.status(200).json({ nome: sorveteEncontrado.nome });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});





sorvete.post('/sorvetes',verifyToken,async (req, res) => {
    try {
      const { nome, quantidade,preco } = req.body;
  
      const novoSorvete = await Sorvete.create({ nome, quantidade,preco });
        
      res.status(201).json({
        mensagem: 'Sorvete criado com sucesso!',
        id: novoSorvete.id,
        nome: novoSorvete.nome,
        quantidade: novoSorvete.quantidade,
        preco:novoSorvete.preco
      });

    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  
  sorvete.delete('/sorvetes/:id',verifyToken,async (req, res) => {
    try {
      const sorveteId = req.params.id;
  
      const associacoesComCompra = await ItemCompra.findAll({
        where: { id_sorvete: sorveteId}
      });


      if (associacoesComCompra.length > 0) {
        return res.status(400).json({ mensagem: 'Este sorvete está associado a uma ou mais compras. Não é possível excluí-lo.' });
      }
  

      const sorveteToDelete = await Sorvete.findByPk(sorveteId);
      if (!sorveteToDelete) {
        return res.status(404).json({ mensagem: 'Sorvete não encontrado' });
      }
  
      await sorveteToDelete.destroy();
  
      return res.status(200).json({ mensagem: 'Sorvete excluído com sucesso' });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  

  sorvete.put('/sorvetes/:id',verifyToken,async (req, res) => {
    try {
      const sorveteId = req.params.id;
      const { nome, quantidade,preco } = req.body;
  
      const sorveteToUpdate = await Sorvete.findByPk(sorveteId);
      if (!sorveteToUpdate) {
        return res.status(404).json({ mensagem: 'Sorvete não encontrado' });
      }
  
      sorveteToUpdate.nome = nome;
      sorveteToUpdate.quantidade = quantidade;
      sorveteToUpdate.preco = preco;

      await sorveteToUpdate.save();
  
      res.status(200).json({
        mensagem:"Sorvete atualizado com sucesso!",
        id: sorveteToUpdate.id,
        nome: sorveteToUpdate.nome,
        quantidade: sorveteToUpdate.quantidade,
        preco:sorveteToUpdate.preco
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });



  sorvete.patch('/sorvetes/atualizarQuantidade/:id', verifyToken, async (req, res) => {
    try {
      const sorveteId = req.params.id;
      const { quantidade } = req.body;
  
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return res.status(400).json({ mensagem: 'A quantidade a subtrair deve ser um número inteiro positivo' });
      }
  
      const sorveteToUpdate = await Sorvete.findByPk(sorveteId);
      if (!sorveteToUpdate) {
        return res.status(404).json({ mensagem: 'Sorvete não encontrado' });
      }
  
      if (sorveteToUpdate.quantidade < quantidade) {
        return res.status(400).json({ mensagem: 'Quantidade insuficiente de sorvete para subtrair'});
      }
  
      sorveteToUpdate.quantidade -= quantidade;
      await sorveteToUpdate.save();
  
      const sorvetesAtualizados = await Sorvete.findAll();
  
      res.status(200).json({
        mensagem: `Quantidade de sorvete ${sorveteToUpdate.nome} subtraída com sucesso`,
        sorvetes: sorvetesAtualizados,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });
  
  

  
export default sorvete;
