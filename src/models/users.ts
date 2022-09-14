import Sequelize, { Model } from 'sequelize';

import db from '../db';

class Users extends Model {
  declare id: string;
  declare email: string;
  declare name: string;
  declare lastName: string;
  declare phone: string;
  declare status: boolean;
  declare password: string;
  declare accessLevel: number;
}

Users.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
    status: Sequelize.BOOLEAN,
    password: Sequelize.STRING,
    accessLevel: Sequelize.INTEGER,
  },
  {
    sequelize: db,
    modelName: 'users',
  },
);

export default Users;
