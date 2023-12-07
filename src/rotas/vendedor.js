import express from 'express';
import Compra from '../model/comprasModel.js';
import Vendedor from '../model/vendedorModel.js';
import verifyToken from '../utils/jwt.js';
const vendedor = express();
vendedor.use(express.json());


vendedor.get('/vendedor', verifyToken,async (req, res) => {
    try {
      
      const vendedoresDoBanco = await Vendedor.findAll();
      
      const mensagem = vendedoresDoBanco.map(vendedor => ({
        id: vendedor.id,
        nome: vendedor.nome,
        cpf: vendedor.cpf,
        email:vendedor.email,
        telefone:vendedor.telefone
      }));
  
      res.status(200).json(mensagem);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });

  vendedor.get('/vendedor/nome/:id', verifyToken, async (req, res) => {
    try {
      const vendedorId = req.params.id;
  
      const vendedorEncontrado = await Vendedor.findByPk(vendedorId, {
        attributes: ['nome']
      });
  
      if (!vendedorEncontrado) {
        return res.status(404).json({ erro: 'Vendedor não encontrado' });
      }
  
      res.status(200).json({ nome: vendedorEncontrado.nome });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });

  vendedor.post('/vendedor', verifyToken,async (req, res) => {
    try {
      const { nome, cpf, email, telefone } = req.body;
  
      const cpfExistente = await Vendedor.findOne({ where: { cpf: cpf } });
      if (cpfExistente) {
        return res.status(400).json({ mensagem: 'CPF já cadastrado!' });
      }

      const novoVendedor = await Vendedor.create({ nome, cpf, email, telefone });
  
      res.status(201).json({
        mensagem:"O vendedor foi cadastrado com sucesso!",
        id: novoVendedor.id,
        nome: novoVendedor.nome,
        cpf: novoVendedor.cpf,
        email: novoVendedor.email,
        telefone: novoVendedor.telefone,
      });
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });
  
  vendedor.put('/vendedor/:id',verifyToken, async (req, res) => {
    try {
      const vendedorId = req.params.id;
      const { nome, email, telefone } = req.body;
  
      const vendedorToUpdate = await Vendedor.findByPk(vendedorId);
      if (!vendedorToUpdate) {
        return res.status(404).json({ erro: 'Vendedor não encontrado' });
      }
  
      vendedorToUpdate.nome = nome;
      vendedorToUpdate.email = email;
      vendedorToUpdate.telefone = telefone;
  
      await vendedorToUpdate.save();
  
      res.status(200).json({
        id: vendedorToUpdate.id,
        nome: vendedorToUpdate.nome,
        cpf: vendedorToUpdate.cpf,
        email: vendedorToUpdate.email,
        telefone: vendedorToUpdate.telefone,
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  
  vendedor.delete('/vendedor/:id', verifyToken, async (req, res) => {
    try {
      const vendedorId = req.params.id;
  
      const associacoesComCompra = await Compra.findAll({
        where: { id_vendedor: vendedorId }
      });
  
      if (associacoesComCompra.length > 0) {
        return res.status(400).json({ mensagem: 'Este vendedor está associado a uma ou mais compras. Não é possível excluí-lo.',flag:false });
      }
  
      const vendedorToDelete = await Vendedor.findByPk(vendedorId);
      if (!vendedorToDelete) {
        return res.status(404).json({ mensagem: 'Vendedor não encontrado',flag:false });
      }
  
      await vendedorToDelete.destroy();
  
      return res.status(200).json({ mensagem: 'Vendedor excluído com sucesso',flag:true });
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: 'Erro interno do servidor',flag:false });
    }
  });
  


  export default vendedor;