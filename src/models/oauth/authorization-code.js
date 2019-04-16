import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import Client from './client';
import User from '../user';

import sequelize from '../../database/postgresql';

class AuthorizationCode extends Model {}

AuthorizationCode.init(
  {
    id: {
      type: DataTypes.STRING(19),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(19);
      }
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
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
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
