
import { DataTypes } from 'sequelize';
import sequelize from '../banco/sequelize.js';

const Usuario = sequelize.define('Usuario', {
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

sequelize.sync({ force: false }).then(() => {
    console.log('Tabela de usuários sincronizado');
  });

export default Usuario;
