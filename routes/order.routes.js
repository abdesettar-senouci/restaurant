import { Router } from 'express';
import Order from '../models/order.model.js';
import Table from '../models/table.model.js';
import MenuItem from '../models/menu.model.js';

const orderRouter = Router();

// Scan QR code and join table order
orderRouter.post('/scan-qr', async (req, res) => {
  try {
    const { qrCode, customerName } = req.body;
    
    // Find table by QR code
    const table = await Table.findOne({ qrCode });
    if (!table) {
      return res.status(404).json({ error: 'Invalid QR code' });
    }

    // Check if there's an active order for this table
    let order = await Order.findOne({ 
      tableNumber: table.tableNumber, 
      status: 'active' 
    });

    if (order) {
      // Add customer to existing order
      const existingCustomer = order.customers.find(c => c.name === customerName);
      if (!existingCustomer) {
        order.customers.push({ name: customerName });
        order.isUnified = order.customers.length > 1;
        await order.save();
      }
    } else {
      // Create new order for this table
      order = new Order({
        tableNumber: table.tableNumber,
        customers: [{ name: customerName }],
        items: []
      });
      await order.save();
      
      table.currentOrder = order._id;
      table.isOccupied = true;
      await table.save();
    }

    res.json({ 
      message: 'Successfully joined table',
      order: {
        _id: order._id,
        tableNumber: order.tableNumber,
        customers: order.customers,
        isUnified: order.isUnified
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add item to order
orderRouter.post('/:orderId/items', async (req, res) => {
  try {
    const { menuItemId, quantity, specialInstructions, orderedBy } = req.body;
    
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem || !menuItem.isAvailable) {
      return res.status(400).json({ error: 'Menu item not available' });
    }

    // Add item to order
    order.items.push({
      menuItem: menuItemId,
      quantity,
      price: menuItem.price,
      specialInstructions,
      orderedBy
    });

    await order.save();
    await order.populate('items.menuItem', 'name price');

    res.json({ 
      message: 'Item added to order',
      order 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get order details
orderRouter.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.menuItem', 'name price category');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update order status
orderRouter.patch('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If order is paid, free up the table
    if (status === 'paid') {
      await Table.findOneAndUpdate(
        { tableNumber: order.tableNumber },
        { 
          isOccupied: false, 
          currentOrder: null 
        }
      );
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default orderRouter;