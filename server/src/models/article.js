import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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

ArticleSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.created = this.updated = Date.now();
  } else {
    this.updated = Date.now();
  }

  next();
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
