import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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
  article_id: {
    type: Schema.Types.ObjectId
  },
  parent_id: {
    type: Schema.Types.ObjectId
  },
  reply_id: {
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

CommentSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.created = this.updated = Date.now();
  } else {
    this.updated = Date.now();
  }

  next();
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
