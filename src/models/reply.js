import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  content: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reply_to_author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment_id: {
    type: Schema.Types.ObjectId
  },
  parent_id: {
    type: Schema.Types.ObjectId
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

ReplySchema.pre('save', async function (next) {
  if (this.isNew) {
    this.created = this.updated = Date.now();
  } else {
    this.updated = Date.now();
  }

  next();
});

const Reply = mongoose.model('Reply', ReplySchema);

export default Reply;
