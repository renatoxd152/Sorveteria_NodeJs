import express from 'express';
import Cliente from '../model/clienteModel.js';
import Compra from '../model/comprasModel.js';
import verifyToken from '../utils/jwt.js';
const cliente = express();
cliente.use(express.json());


cliente.get('/cliente', verifyToken, async (req, res) => {
    try {
      
      const clientesDoBanco = await Cliente.findAll();
      
      const mensagem = clientesDoBanco.map(cliente => ({
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
        email:cliente.email,
        telefone:cliente.telefone
      }));
  
      res.status(200).json(mensagem);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });



  cliente.get('/cliente/nome/:id', verifyToken, async (req, res) => {
    try {
      const clienteId = req.params.id;
  
      const clienteEncontrado = await Cliente.findByPk(clienteId, {
        attributes: ['nome']
      });
  
      if (!clienteEncontrado) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }
  
      res.status(200).json({ nome: clienteEncontrado.nome });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });










  cliente.post('/cliente',verifyToken, async (req, res) => {
    try {
      const { nome, cpf, email, telefone } = req.body;

      const cpfExistente = await Cliente.findOne({ where: { cpf: cpf } });
      if (cpfExistente) {
        return res.status(400).json({ mensagem: 'CPF já cadastrado' });
      }
      const novoCliente = await Cliente.create({ nome, cpf, email, telefone });
  
      res.status(201).json({
        mensagem: 'Cliente cadastrado com sucesso!',
        id: novoCliente.id,
        nome: novoCliente.nome,
        cpf: novoCliente.cpf,
        email: novoCliente.email,
        telefone: novoCliente.telefone,
      });
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  
  cliente.put('/cliente/:id', verifyToken,async (req, res) => {
    try {
      const clienteId = req.params.id;
      const { nome, email, telefone } = req.body;
  
      const clienteToUpdate = await Cliente.findByPk(clienteId);
      if (!clienteToUpdate) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }
  
      clienteToUpdate.nome = nome;
      clienteToUpdate.email = email;
      clienteToUpdate.telefone = telefone;
  
      await clienteToUpdate.save();
  
      res.status(200).json({
        id: clienteToUpdate.id,
        nome: clienteToUpdate.nome,
        cpf: clienteToUpdate.cpf,
        email: clienteToUpdate.email,
        telefone: clienteToUpdate.telefone,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  
  cliente.delete('/cliente/:id', verifyToken,async (req, res) => {
    try {
      const clienteId = req.params.id;
  
      const associacoesComCompra = await Compra.findAll({
        where: { id_cliente: clienteId}
      });

      if (associacoesComCompra.length > 0) {
        return res.status(400).json({ mensagem: 'Este cliente está associado a uma ou mais compras. Não é possível excluí-lo.' });
      }

      const clienteToDelete = await Cliente.findByPk(clienteId);
      if (!clienteToDelete) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' });
      }
  
      await clienteToDelete.destroy();
  
      return res.status(200).json({ mensagem: 'Cliente excluído com sucesso' });
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });


  export default cliente;