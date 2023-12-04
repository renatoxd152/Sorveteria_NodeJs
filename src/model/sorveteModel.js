
import { DataTypes } from 'sequelize';
import sequelize from '../banco/sequelize.js';

const Sorvete = sequelize.define('Sorvete', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco:{
    type:DataTypes.FLOAT,
    allowNull:false
  }
  ,
}, {
  timestamps: false
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela sorvete sincronizado');
  });

export default Sorvete;
