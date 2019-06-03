import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import sequelize from '../database/postgresql';

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.STRING(19),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(19);
      }
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    author_id: {
      type: DataTypes.STRING
    }
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
    modelName: 'topic',
    underscored: true,
    tableName: 'topics',
    sequelize
  }
);

export default Article;
