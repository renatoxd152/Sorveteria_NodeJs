// sequelize.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'C:\\Users\\renat\\OneDrive\\Área de Trabalho\\Sorveteria_NodeJs\\sorveteria.sqlite',
});

export default sequelize;
