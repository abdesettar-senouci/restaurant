import { Router } from 'express';
import MenuItem from '../models/menu.model.js';

const menuRouter = Router();

// Get all menu items
menuRouter.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (available !== undefined) filter.isAvailable = available === 'true';

    const menuItems = await MenuItem.find(filter).sort({ category: 1, name: 1 });
    res.json({ menuItems });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add new menu item
menuRouter.post('/', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json({ menuItem, message: 'Menu item added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update menu item
menuRouter.put('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.json({ menuItem, message: 'Menu item updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default menuRouter;