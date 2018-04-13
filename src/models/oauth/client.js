import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: String,
  client_id: String,
  client_secret: String,
  redirect_uris: {
    type: [String]
  },
  grant_types: {
    type: [String],
    default: [
      'authorization_code',
      'password',
      'refresh_token',
      'client_credentials'
    ]
  },
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const ClientModel = mongoose.model('Client', ClientSchema);

export default ClientModel;
