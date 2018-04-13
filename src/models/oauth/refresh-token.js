import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
  refresh_token: String,
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

const refreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema);

export default refreshTokenModel;
