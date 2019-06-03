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
    scope: DataTypes.STRING
    // client_id: {
    //   type: DataTypes.STRING(19),
    //   references: {
    //     model: "oauth_clients",
    //     key: "id"
    //   }
    // },
    // user_id: {
    //   type: DataTypes.STRING(19),
    //   references: {
    //     model: "users",
    //     key: "id"
    //   }
    // },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   field: 'created_at'
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   field: 'updated_at'
    // }
  },
  {
    modelName: 'authorization_code',
    underscored: true,
    tableName: 'oauth_authorization_codes',
    sequelize
  }
);

AuthorizationCode.belongsTo(Client, {
  foreignKey: 'client_id',
  constraints: false
});

AuthorizationCode.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false
});

export default AuthorizationCode;
