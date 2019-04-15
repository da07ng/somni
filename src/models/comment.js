import { Model, DataTypes } from 'sequelize';
// import argon2 from 'argon2';
import nanoid from 'nanoid';

import sequelize from '../database/postgresql';

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.STRING(22),
      allowNull: false,
      primaryKey: true,
      defaultValue: nanoid(22)
    },
    content: {
      type: DataTypes.STRING
    },
    author: {
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
    },
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
    tableName: 'comments',
    sequelize
  }
);

export default Comment;
