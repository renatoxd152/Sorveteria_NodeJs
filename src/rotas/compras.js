import express from 'express';
import Compra from '../model/comprasModel.js';
import Vendedor from '../model/vendedorModel.js';
import Cliente from '../model/clienteModel.js';
import ItemCompra from '../model/itensCompraModel.js';
import Sorvete from '../model/sorveteModel.js';
import verifyToken from '../utils/jwt.js';
import { format } from 'date-fns';
const compra = express();
compra.use(express.json());

compra.get('/compras',verifyToken, async (req, res) => {
    try {
      
      const comprasDoBanco = await Compra.findAll();
      
      const mensagem = comprasDoBanco.map(compra => ({
        id: compra.id,
        data_compra: compra.data_compra, 
        id_vendedor:compra.id_vendedor,
        id_cliente:compra.id_cliente,
        valor_compra:compra.valor_compra
      }));
  
      res.status(200).json(mensagem);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });


  compra.post('/compras',verifyToken, async (req, res) => {
    try {
      const { id_vendedor, id_cliente,valor_compra,sorvetes } = req.body;
      
      const vendedorExistente = await Vendedor.findByPk(id_vendedor);
      if (!vendedorExistente) {
        return res.status(404).json({ mensagem: 'Vendedor não encontrado' });
      }

      const clienteExistente = await Cliente.findByPk(id_cliente);
      if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado' });
      }

      
  
  
      const data_compra = new Date();
      const dataFormatada = format(data_compra, 'yyyy-MM-dd HH:mm:ss');

      const novaCompra = await Compra.create({ data_compra, id_vendedor, id_cliente,valor_compra });

      let erroEncontrado = false;

      await Promise.all(
        sorvetes.map(async (sorvete) => {
          const sorveteExistente = await Sorvete.findByPk(sorvete.id_sorvete);
          if (!sorveteExistente) {
            erroEncontrado = true;
          } else {
            await ItemCompra.create({
              quantidade: sorvete.quantidade,
              id_compra: novaCompra.id,
              id_sorvete: sorvete.id_sorvete,
            });
          }
        })
      );
  
      if (erroEncontrado) {
        return res.status(404).json({ mensagem: 'Um ou mais sorvetes não foram encontrados' });
      }

      res.status(201).json({
        mensagem:"Compra cadastrada com sucesso!",
        id: novaCompra.id,
        data_compra: dataFormatada,
        id_vendedor: novaCompra.id_vendedor,
        id_cliente: novaCompra.id_cliente,
        valor_Compra:novaCompra.valor_compra
      });
  
    } catch (erro) {
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  });
  

  compra.put('/compras/:id',verifyToken ,async (req, res) => {
    try {
      const { id } = req.params;
      const { id_vendedor, id_cliente,valor_compra} = req.body;
  
      const compraExistente = await Compra.findByPk(id);
      if (!compraExistente) {
        return res.status(404).json({ erro: 'Compra não encontrada' });
      }
  
      const vendedorExistente = await Vendedor.findByPk(id_vendedor);
      if (!vendedorExistente) {
        return res.status(404).json({ erro: 'Vendedor não encontrado' });
      }
  
      const clienteExistente = await Cliente.findByPk(id_cliente);
      if (!clienteExistente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }
      await compraExistente.update({
        id_vendedor,
        id_cliente,
        valor_compra
      });
  
      res.status(200).json({
        id: compraExistente.id,
        data_compra: compraExistente.data_compra,
        id_vendedor: compraExistente.id_vendedor,
        id_cliente: compraExistente.id_cliente,
        valor_compra:compraExistente.valor_compra
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });
  
  compra.delete('/compras/:id',verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
  
      const compraExistente = await Compra.findByPk(id);
      if (!compraExistente) {
        return res.status(404).json({ mensagem: 'Compra não encontrada' });
      }

      await ItemCompra.destroy({
        where: {
          id_compra: compraExistente.id,
        },
      });


      await compraExistente.destroy();


  
      return res.status(200).json({ mensagem: 'Compra excluída com sucesso' });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });

  
export default compra;