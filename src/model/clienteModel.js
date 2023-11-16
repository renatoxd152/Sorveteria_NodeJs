
import { DataTypes } from 'sequelize';
import sequelize from '../banco/sequelize.js';

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:
  {
    type:DataTypes.STRING,
    allowNull:false,
  },
  telefone:
  {
    type:DataTypes.STRING,
    allowNull:false,
  }
}, {
  timestamps: false
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela cliente sincronizado');
  });

export default Cliente;
