import Sequelize, { Model } from 'sequelize';

import db from '../db';
import Users from './users';

class Companies extends Model {
  declare id: string;
  declare idUser: string;
  declare companyLogo: string;
  declare country: string;
}

Companies.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUser: Sequelize.INTEGER,
    companyLogo: Sequelize.STRING,
    country: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'companies',
  },
);

Companies.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });

export default Companies;
