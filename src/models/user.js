import { Model, DataTypes } from 'sequelize';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
// import argon2 from 'argon2';
import nanoid from 'nanoid';

import sequelize from '../database/postgresql';

class User extends Model {
  static async checkPassword(password, hashPassword) {
    let shasum = crypto.createHash('sha256');
    shasum.update(password);

    return bcrypt.compare(shasum.digest('hex'), hashPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING(19),
      allowNull: false,
      primaryKey: true,
      defaultValue: function () {
        return nanoid(19);
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: '用户名已存在'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: '邮箱已存在'
      },
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'user',
    underscored: true,
    tableName: 'users',
    sequelize
  }
);

User.beforeCreate(async (user, options) => {
  let shasum = crypto.createHash('sha256');
  shasum.update(user.password);

  let saltRounds = 10;
  let hashPassword = await bcrypt.hash(shasum.digest('hex'), saltRounds);

  user.password = hashPassword;
});

export default User;
