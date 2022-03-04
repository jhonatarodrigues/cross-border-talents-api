import Sequelize, {Model} from 'sequelize';
import db from '../db';

class Users extends Model {
  declare id: string;
  declare email : string;
  declare phone: string;
  declare status: boolean;
  declare password: string;
}

Users.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  status: Sequelize.BOOLEAN,
  password: Sequelize.STRING,
},{
  sequelize: db,
  modelName: 'users'
});

export default Users;