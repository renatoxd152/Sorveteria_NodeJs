import express from 'express';
import ItemCompra from '../model/itensCompraModel.js';
import verifyToken from '../utils/jwt.js';
const itens = express();
itens.use(express.json());


itens.get('/compra/:id',verifyToken,async(req,res)=>
{
    try {
        const idCompra = req.params.id;

        const itensDoBanco = await ItemCompra.findAll({
            where: { id_compra: idCompra }
          });

          const mensagem = itensDoBanco.map(item => ({
            id: item.id,
            id_compra:item.id_compra,
            id_sorvete:item.id_sorvete,
            quantidade:item.quantidade
          }));

    
        res.status(200).json(mensagem);
      } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
      }
});


itens.get('/compra', verifyToken,async (req, res) => {
  try {
    
    const itensDoBanco = await ItemCompra.findAll();
    
    const mensagem = itensDoBanco.map(item => ({
      id: item.id,
      id_compra: item.id_compra,
      id_sorvete: item.id_sorvete,
      quantidade:item.quantidade
    }));

    res.status(200).json(mensagem);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

itens.put('/compra/:id',verifyToken ,async (req, res) => {
    try {
      const itemID = req.params.id;
      const {id_sorvete, quantidade } = req.body;
  
      const itemToUpdate = await ItemCompra.findByPk(itemID);
      if (!itemToUpdate) {
        return res.status(404).json({ erro: 'Item não encontrado' });
      }
  
      itemToUpdate.id_sorvete = id_sorvete;
      itemToUpdate.quantidade = quantidade;
  
      await itemToUpdate.save();
  
      res.status(200).json({
        id: itemToUpdate.id,
        id_sorvete: itemToUpdate.id_sorvete,
        quantidade:itemToUpdate.quantidade
    });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });



itens.delete('/compra/:id',verifyToken, async (req, res) => {
    try {
      const itemId = req.params.id;
  
      const itemToDelete = await ItemCompra.findByPk(itemId);
      if (!itemToDelete) {
        return res.status(404).json({ erro: 'Item não encontrado' });
      }
  
      await itemToDelete.destroy();
  
      return res.status(200).json({ mensagem: 'Item excluído com sucesso' });
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: 'Erro interno do servidor' });
    }
  });


export default itens;