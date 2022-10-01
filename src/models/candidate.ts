import Sequelize, { Model } from 'sequelize';

import db from '../db';
import InterestSkills from './intrestSkills';
import Recruiter from './recruiter';
import TeamLeader from './teamLeader';
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
  declare observations: string;
  declare talentPoolVerify: boolean;
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
      allowNull: true,
    },
    idUser: Sequelize.INTEGER,
    idInterestSkills: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },

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
    observations: Sequelize.TEXT,
    talentPoolVerify: Sequelize.BOOLEAN,

    recruiter: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'candidate',
  },
);

Candidate.belongsTo(Users, { foreignKey: 'idUser', as: 'user' });
Candidate.belongsTo(TeamLeader, {
  foreignKey: 'teamLeader',
  as: 'userTeamLeader',
});
Candidate.belongsTo(Recruiter, {
  foreignKey: 'recruiter',
  as: 'userRecruiter',
});
Candidate.belongsTo(InterestSkills, {
  foreignKey: 'idInterestSkills',
  as: 'interestSkills',
});

export default Candidate;
