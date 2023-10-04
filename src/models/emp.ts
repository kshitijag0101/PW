import mongoose from 'mongoose';

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  sub_department: {
    type: String,
    required: true,
  },
  on_contract: Boolean
});

export default mongoose.model('Employee', empSchema);
