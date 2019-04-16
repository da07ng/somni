import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import sequelize from '../../database/postgresql';

class Scope extends Model {}

Scope.init(
  {
    id: {
      type: DataTypes.STRING(19),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(19);
      }
    },
    scope: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN,
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
    tableName: 'oauth_scopes',
    sequelize
  }
);

export default Scope;
