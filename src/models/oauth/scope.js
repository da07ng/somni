import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ScopeSchema = new Schema({
  scope: String,
  is_default: Boolean
});

const Scope = mongoose.model('Scope', ScopeSchema);

export default Scope;
