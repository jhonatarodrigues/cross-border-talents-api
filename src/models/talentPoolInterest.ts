import Sequelize, { Model } from 'sequelize';

import db from '../db';
import Company from './companies';
import TalentPool from './talentPool';

class TalentPoolInterest extends Model {
  declare id: string;
  declare idTalentPool: string;
  declare idCompany: string;
}

TalentPoolInterest.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    idTalentPool: Sequelize.INTEGER,
    idCompany: Sequelize.INTEGER,
  },
  {
    sequelize: db,
    modelName: 'talentPoolInterest',
    tableName: 'talentPoolInterest',
  },
);

TalentPoolInterest.belongsTo(TalentPool, {
  foreignKey: 'idTalentPool',
  as: 'talentPool',
});
TalentPoolInterest.belongsTo(Company, {
  foreignKey: 'idCompany',
  as: 'company',
});

export default TalentPoolInterest;
