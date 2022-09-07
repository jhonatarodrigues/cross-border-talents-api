import Sequelize, { Model } from 'sequelize';

import db from '../db';
import TeamLeader from './teamLeader';
import Users from './users';

class Recruiter extends Model {
  declare id: string;
  declare idUser: string;
  declare teamLeader: string;
  declare user?: Users;
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
    interestSkills: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'recruiter',
  },
);

Recruiter.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });
Recruiter.belongsTo(TeamLeader, {
  foreignKey: 'teamLeader',
  as: 'userTeamLeader',
});

export default Recruiter;
