import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ManuscriptSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
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

const Manuscript = mongoose.model('Manuscript', ManuscriptSchema);

export default Manuscript;
