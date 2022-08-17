import Sequelize, { Model } from 'sequelize';

import db from '../db';
import InterestSkills from './intrestSkills';
import Recruiter from './recruiter';

class Jobs extends Model {
  declare id: string;
  declare idInterestSkills: string;

  declare jobTitle: string;
  declare level: string;
  declare country: string;
  declare description: string;
  declare date: Date;
}

Jobs.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idInterestSkills: Sequelize.INTEGER,

    jobTitle: Sequelize.STRING,
    level: Sequelize.STRING,
    country: Sequelize.STRING,
    description: Sequelize.TEXT,
    date: Sequelize.DATE,
    requirements: Sequelize.TEXT,
    benefits: Sequelize.TEXT,

    recruiter: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'jobs',
  },
);

Jobs.belongsTo(Recruiter, {
  foreignKey: 'recruiter',
  as: 'userRecruiter',
});
Jobs.belongsTo(InterestSkills, {
  foreignKey: 'idInterestSkills',
  as: 'interestSkills',
});

export default Jobs;
