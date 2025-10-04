import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  specialInstructions: {
    type: String,
    trim: true
  },
  orderedBy: {
    type: String,
    required: true,
    trim: true
  }
});

const orderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    index: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'preparing', 'ready', 'served', 'paid'],
    default: 'active'
  },
  customers: [{
    name: String,
    scannedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isUnified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate total before saving
orderSchema.pre('save', function(next) {
  this.totalAmount = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  next();
});

export default mongoose.model('Order', orderSchema);