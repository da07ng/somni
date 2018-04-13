import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
// import argon2 from 'argon2';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  password: {
    type: String
  },
  scope: {
    type: String
  },
  roles: {
    type: Array,
    default: [],
    index: true
  },
  created: {
    type: Date,
    default: Date.now,
    index: true
  },
  updated: {
    type: Date,
    default: Date.now,
    index: true
  }
});

UserSchema.path('password').set(function (v) {
  let shasum = crypto.createHash('sha256');
  shasum.update(v);

  const saltRounds = 10;
  const hash = bcrypt.hashSync(shasum.digest('hex'), saltRounds);

  return hash;
});

UserSchema.pre('save', function (next) {
  this.updated = Date.now();
  next();
});

UserSchema.statics.findById = function (id) {
  return this.findById(id);
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({
    username: username
  });
};

UserSchema.statics.checkPassword = async function (password, hash) {
  let shasum = crypto.createHash('sha256');
  shasum.update(password);

  return bcrypt.compareSync(shasum.digest('hex'), hash);
};

const userModel = mongoose.model('User', UserSchema);

export default userModel;
