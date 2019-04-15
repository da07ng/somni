import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import Client from './client';
import User from '../user';

import sequelize from '../../database/postgresql';

class RefreshToken extends Model {}

RefreshToken.init(
  {
    id: {
      type: DataTypes.STRING(22),
      allowNull: false,
      primaryKey: true,
      defaultValue: nanoid(22)
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires: DataTypes.DATE,
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
    tableName: 'oauth_refresh_tokens',
    sequelize
  }
);

RefreshToken.belongsTo(Client, {
  foreignKey: 'client_id'
});

RefreshToken.belongsTo(User, {
  foreignKey: 'user_id'
});

export default RefreshToken;
