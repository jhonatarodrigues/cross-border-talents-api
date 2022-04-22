import Sequelize, { Model } from 'sequelize';

import db from '../db';
import Users from './users';

class Recruiter extends Model {
  declare id: string;
  declare idUser: string;
  declare teamLeader: string;
}

Recruiter.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUser: Sequelize.INTEGER,
    teamLeader: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    development: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'recruiter',
  },
);

Recruiter.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });
Recruiter.belongsTo(Users, { foreignKey: 'teamLeader', as: 'userTeamLeader' });

export default Recruiter;
