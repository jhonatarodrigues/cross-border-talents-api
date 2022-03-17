import Sequelize, { Model } from 'sequelize';

import db from '../db';
import Users from './users';

class Recruiter extends Model {
  declare id: string;
  declare email: string;
  declare phone: string;
  declare status: boolean;
  declare password: string;
  declare accessLevel: number;
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
    teamLeader: Sequelize.INTEGER,
  },
  {
    sequelize: db,
    modelName: 'recruiter',
  },
);

Recruiter.belongsTo(Users, { foreignKey: 'idUser' });
Recruiter.hasMany(Users, { foreignKey: 'teamLeader' });

// Users.hasMany(Recruiter);

// Recruiter.belongsTo(Users, { id: 'idUser' });

export default Recruiter;
