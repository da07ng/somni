import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import sequelize from '../../database/postgresql';

class Scope extends Model {}

Scope.init(
  {
    id: {
      type: DataTypes.STRING(22),
      allowNull: false,
      primaryKey: true,
      defaultValue: nanoid(22)
    },
    scope: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN,
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
    tableName: 'oauth_scopes',
    sequelize
  }
);

export default Scope;
