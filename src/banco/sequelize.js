// sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:\\Users\\Projeto 6\\Documents\\banco\\sorveteria.sqlite',
});

export default sequelize;
