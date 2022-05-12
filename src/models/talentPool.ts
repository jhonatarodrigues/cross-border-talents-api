import Sequelize, { Model } from 'sequelize';

import db from '../db';
import TeamLeader from './teamLeader';
import Users from './users';

class TalentPool extends Model {
  declare id: string;
  declare idUser: string;
  declare idTeamLeader: string;
  declare data: Date;
  declare profile: boolean;
  declare observation: string;
  declare softwares: string;
  declare education: string;
  declare experience: string;
  declare languages: string;
  declare status: boolean;
}

TalentPool.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idUser: Sequelize.INTEGER,
    idTeamLeader: Sequelize.INTEGER,

    data: Sequelize.DATE,
    charge: Sequelize.STRING,
    profile: Sequelize.STRING(300),
    observation: Sequelize.TEXT,
    softwares: Sequelize.TEXT,
    education: Sequelize.TEXT,
    experience: Sequelize.TEXT,
    languages: Sequelize.TEXT,
    status: Sequelize.BOOLEAN,
  },
  {
    sequelize: db,
    modelName: 'talentPool',
  },
);

TalentPool.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });
TalentPool.belongsTo(TeamLeader, {
  foreignKey: 'idTeamLeader',
  as: 'teamLeader',
});

export default TalentPool;
