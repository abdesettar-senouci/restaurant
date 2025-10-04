import { Router } from 'express';
import Table from '../models/table.model.js';
import { generateQRCode } from '../utils/qrGenerator.js';

const tableRouter = Router();

// Create new table
tableRouter.post('/', async (req, res) => {
  try {
    const { tableNumber, capacity, location } = req.body;
    
    // Check if table number already exists
    const existingTable = await Table.findOne({ tableNumber });
    if (existingTable) {
      return res.status(400).json({ error: 'Table number already exists' });
    }

    // Generate QR code for the table
    const qrCode = await generateQRCode(`table-${tableNumber}-${Date.now()}`);
    
    const table = new Table({
      tableNumber,
      capacity,
      location: location || 'indoor',
      qrCode
    });

    await table.save();
    
    res.status(201).json({ 
      message: 'Table created successfully',
      table 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tables
tableRouter.get('/', async (req, res) => {
  try {
    const { location, isOccupied } = req.query;
    let filter = {};
    
    if (location) filter.location = location;
    if (isOccupied !== undefined) filter.isOccupied = isOccupied === 'true';

    const tables = await Table.find(filter)
      .sort({ tableNumber: 1 })
      .populate('currentOrder', 'totalAmount status');
    
    res.json({ tables });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get table by number
tableRouter.get('/:tableNumber', async (req, res) => {
  try {
    const table = await Table.findOne({ tableNumber: req.params.tableNumber })
      .populate('currentOrder');
    
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.json({ table });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update table
tableRouter.put('/:tableNumber', async (req, res) => {
  try {
    const table = await Table.findOneAndUpdate(
      { tableNumber: req.params.tableNumber },
      req.body,
      { new: true, runValidators: true }
    );

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.json({ 
      message: 'Table updated successfully',
      table 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete table
tableRouter.delete('/:tableNumber', async (req, res) => {
  try {
    const table = await Table.findOneAndDelete({ tableNumber: req.params.tableNumber });

    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    res.json({ message: 'Table deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default tableRouter;