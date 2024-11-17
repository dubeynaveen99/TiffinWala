const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // References the provider
  items: [{ name: String, quantity: Number }],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
