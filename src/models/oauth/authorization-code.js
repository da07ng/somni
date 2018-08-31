import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AuthorizationCodeSchema = new Schema({
  authorization_code: String,
  expires: Date,
  redirect_uri: String,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }
});

const AuthorizationCodeModel = mongoose.model(
  'AuthorizationCode',
  AuthorizationCodeSchema
);

export default AuthorizationCodeModel;
