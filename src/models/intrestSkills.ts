import Sequelize, { Model } from 'sequelize';

import db from '../db';

class InterestSkills extends Model {
  declare id: string;
  declare name: string;
}

InterestSkills.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'interestSkills',
  },
);

export default InterestSkills;
