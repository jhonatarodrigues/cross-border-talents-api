import Sequelize, { Model } from 'sequelize';

import db from '../db';
import InterestSkills from './intrestSkills';
import TeamLeader from './teamLeader';
import Users from './users';

class Companies extends Model {
  declare id: string;
  declare teamLeader: string;
  declare idUser: string;
  declare idInterestSkills: string;

  declare companyLogo: string;
  declare country: string;
  declare companyName: string;
}

Companies.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamLeader: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idUser: Sequelize.INTEGER,
    idInterestSkills: Sequelize.INTEGER,

    companyLogo: Sequelize.STRING,
    country: Sequelize.STRING,
    companyName: Sequelize.STRING,
    industry: Sequelize.STRING,
    site: Sequelize.STRING,
    size: Sequelize.STRING,
    address1: Sequelize.STRING,
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    facebook: Sequelize.STRING,
    instagram: Sequelize.STRING,
    linkedin: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'companies',
  },
);

Companies.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });
Companies.belongsTo(TeamLeader, {
  foreignKey: 'teamLeader',
  as: 'userTeamLeader',
});
Companies.belongsTo(InterestSkills, {
  foreignKey: 'idInterestSkills',
  as: 'interestSkills',
});

export default Companies;
