import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import sequelize from '../database/postgresql';

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.STRING(19),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(19);
      }
    },
    content: {
      type: DataTypes.STRING
    },
    author_id: {
      type: DataTypes.STRING
    },
    reply_to_author: {
      type: DataTypes.STRING
    },
    article_id: {
      type: DataTypes.STRING
    },
    parent_id: {
      type: DataTypes.STRING
    },
    reply_id: {
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
    modelName: 'comment',
    underscored: true,
    tableName: 'comments',
    sequelize
  }
);

export default Comment;
