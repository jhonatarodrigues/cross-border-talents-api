import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(String(process.env.DB_BASE), String(process.env.DB_USER), String(process.env.DB_PASSWORD), {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(String(process.env.DB_PORT), 10),
})

export default sequelize;