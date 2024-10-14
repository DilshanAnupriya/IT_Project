const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  birthday: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  service: { type: String, required: true },
  ownername: { type: String, required: true },
  contact: { type: String, required: true },
  OwnerEmail: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Parent = mongoose.model('Parent', parentSchema);
module.exports = Parent;
