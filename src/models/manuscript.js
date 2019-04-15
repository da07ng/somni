import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import sequelize from '../database/postgresql';

class Manuscript extends Model {}

Manuscript.init(
  {
    id: {
      type: DataTypes.STRING(18),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(18);
      }
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    author: {
      type: DataTypes.STRING
    },
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
    tableName: 'comments',
    sequelize
  }
);

export default Manuscript;
