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
  email: {
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

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    let shasum = crypto.createHash('sha256');
    shasum.update(this.password);

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(shasum.digest('hex'), saltRounds);

    this.password = hashPassword;
  }

  this.updated = Date.now();
  next();
});

UserSchema.statics.findById = function (id) {
  return this.findById(id);
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({
    username: { $regex: username, $options: 'i' }
  });
};

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({
    email: { $regex: email, $options: 'i' }
  });
};

UserSchema.statics.checkPassword = function (password, hash) {
  let shasum = crypto.createHash('sha256');
  shasum.update(password);

  return bcrypt.compare(shasum.digest('hex'), hash);
};

const User = mongoose.model('User', UserSchema);

export default User;
