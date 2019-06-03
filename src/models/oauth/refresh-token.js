import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import Client from './client';
import User from '../user';

import sequelize from '../../database/postgresql';

class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: {
      type: DataTypes.STRING(19),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(19);
      }
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires: DataTypes.DATE,
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
    modelName: 'refresh_token',
    underscored: true,
    tableName: 'oauth_refresh_tokens',
    sequelize
  }
);

RefreshToken.belongsTo(Client, {
  foreignKey: 'client_id',
  constraints: false
});

RefreshToken.belongsTo(User, {
  foreignKey: 'user_id',
  constraints: false
});

export default RefreshToken;
