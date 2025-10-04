import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['appetizer', 'main_course', 'dessert', 'beverage', 'special']
  },
  image: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number,
    default: 15
  },
  allergens: [{
    type: String,
    enum: ['gluten', 'dairy', 'nuts', 'shellfish', 'eggs', 'soy']
  }]
}, {
  timestamps: true
});

export default mongoose.model('MenuItem', menuItemSchema);