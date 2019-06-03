import { Model, DataTypes } from 'sequelize';
import nanoid from 'nanoid';

import sequelize from '../database/postgresql';

class Reply extends Model {}

Reply.init(
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
    comment_id: {
      type: DataTypes.STRING
    },
    parent_id: {
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
    modelName: 'reply',
    underscored: true,
    tableName: 'replies',
    sequelize
  }
);

export default Reply;
