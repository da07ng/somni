import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import Client from './client';
import User from '../user';

import sequelize from '../../database/postgresql';

class AuthorizationCode extends Model {}

AuthorizationCode.init(
  {
    id: {
      type: DataTypes.STRING(22),
      allowNull: false,
      primaryKey: true,
      defaultValue: nanoid(22)
    },
    authorization_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires: DataTypes.DATE,
    redirect_uri: DataTypes.STRING,
    scope: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_id'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_id'
    }
  },
  {
    tableName: 'oauth_authorization_codes',
    sequelize
  }
);

AuthorizationCode.belongsTo(Client, {
  foreignKey: 'client_id'
});

AuthorizationCode.belongsTo(User, {
  foreignKey: 'user_id'
});

export default AuthorizationCode;
