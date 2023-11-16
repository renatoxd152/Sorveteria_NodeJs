import { DataTypes } from 'sequelize';
import sequelize from '../banco/sequelize.js';
import Vendedor from './vendedorModel.js';
import Cliente from './clienteModel.js';

const Compra = sequelize.define('Compra', {
  data_compra: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valor_compra: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
}, {
  timestamps: false
});

Compra.belongsTo(Vendedor, {
        constraint: true,
        foreignKey: 'id_vendedor'
     });
Compra.belongsTo(Cliente, { 
    constraint: true,
    foreignKey: 'id_cliente'
 });

 sequelize.sync({ force: false }).then(() => {
  console.log('Tabela compras sincronizado');
});

export default Compra;
