import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  location: {
    type: String,
    enum: ['indoor', 'outdoor', 'terrace', 'private'],
    default: 'indoor'
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  qrCode: {
    type: String,
    unique: true,
    required: true
  },
  currentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }
}, {
  timestamps: true
});

export default mongoose.model('Table', tableSchema);