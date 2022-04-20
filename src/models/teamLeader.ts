import Sequelize, { Model } from 'sequelize';

import db from '../db';
import Users from './users';

class TeamLeader extends Model {
  declare id: string;
  declare idUser: string;
  declare department: string;
}

TeamLeader.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUser: Sequelize.INTEGER,
    department: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'teamLeader',
  },
);

TeamLeader.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });

export default TeamLeader;
