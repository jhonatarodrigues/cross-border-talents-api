import Sequelize, { Model } from 'sequelize';

import db from '../db';
import InterestSkills from './intrestSkills';
import Users from './users';

class Candidate extends Model {
  declare id: string;
  declare idUser: string;
  declare idInterestSkills: string;

  declare profilePicture: string;
  declare socialMedia: string;
  declare birthDate: string;
  declare country: string;
  declare gender: string;
  declare cvUpload: string;
  declare allowTalentPool: boolean;
  declare allowContactMe: boolean;
  declare privacityPolicy: boolean;
  declare englishLevel: string;
  declare recruiter: string;
}

Candidate.init(
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

    profilePicture: Sequelize.STRING,
    socialMedia: Sequelize.STRING,
    birthDate: Sequelize.DATEONLY,
    country: Sequelize.STRING,
    gender: Sequelize.STRING,
    nativeLanguage: Sequelize.STRING,
    cvUpload: Sequelize.STRING,
    allowTalentPool: Sequelize.BOOLEAN,
    allowContactMe: Sequelize.BOOLEAN,
    privacityPolicy: Sequelize.BOOLEAN,
    englishLevel: Sequelize.STRING,

    recruiter: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'candidate',
  },
);

Candidate.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });
Candidate.belongsTo(Users, { foreignKey: 'teamLeader', as: 'userTeamLeader' });
Candidate.belongsTo(Users, { foreignKey: 'recruiter', as: 'userRecruiter' });
Candidate.belongsTo(InterestSkills, {
  foreignKey: 'idInterestSkills',
  as: 'interestSkills',
});

export default Candidate;
