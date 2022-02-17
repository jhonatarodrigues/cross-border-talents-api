import Sequelize from 'sequelize';

const sequelize = new Sequelize('backendga', 'root', '#Local123', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
})

export default sequelize;