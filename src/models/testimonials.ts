import Sequelize, { Model } from 'sequelize';

import db from '../db';

class Testimonials extends Model {
  declare id: string;
  declare picture: string;
  declare testimonial: string;
  declare date: Date;
  declare observations: string;
  declare country: string;
}

Testimonials.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: Sequelize.STRING,
    picture: Sequelize.STRING,
    testimonial: Sequelize.TEXT,
    date: Sequelize.DATE,
    observations: Sequelize.STRING,
    country: Sequelize.STRING,
  },
  {
    sequelize: db,
    modelName: 'testimonials',
  },
);

export default Testimonials;
