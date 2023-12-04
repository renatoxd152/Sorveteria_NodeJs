// sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '\\Sorveteria_NodeJs\\sorveteria.sqlite',
});

export default sequelize;
