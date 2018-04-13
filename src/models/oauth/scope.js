import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ScopeSchema = new Schema({
  scope: String,
  is_default: Boolean
});

const ScopeModel = mongoose.model('Scope', ScopeSchema);

export default ScopeModel;
