import { DataTypes } from 'sequelize';
import sequelize from '../banco/sequelize.js';
import Compra from '../model/comprasModel.js';
import Sorvete from '../model/sorveteModel.js';

const ItemCompra = sequelize.define('Itens_Compra', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false
});


ItemCompra.belongsTo(Compra, {
        constraint: true,
        foreignKey: 'id_compra'
     });

ItemCompra.belongsTo(Sorvete,{
    constraint:true,
    foreignKey:'id_sorvete'
});

 sequelize.sync({ force: false }).then(() => {
  console.log('Tabela de itens da compra sincronizado');
});

export default ItemCompra;
