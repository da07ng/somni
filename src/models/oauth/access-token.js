import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccessTokenSchema = new Schema({
  access_token: String,
  expires: Date,
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

const AccessTokenModel = mongoose.model('AccessToken', AccessTokenSchema);

export default AccessTokenModel;
