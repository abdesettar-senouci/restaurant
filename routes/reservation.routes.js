import { Router } from 'express';
import Reservation from '../models/reservation.model.js';
import Table from '../models/table.model.js';

const reservationRouter = Router();

// Create new reservation (pre-booking)
reservationRouter.post('/', async (req, res) => {
  try {
    const { 
      tableNumber, 
      customerName, 
      customerPhone, 
      customerEmail,
      partySize, 
      reservationDate, 
      reservationTime,
      notes 
    } = req.body;
    
    // Check if table exists
    const table = await Table.findOne({ tableNumber });
    if (!table) {
      return res.status(400).json({ error: 'Table does not exist' });
    }

    // Check table capacity
    if (partySize > table.capacity) {
      return res.status(400).json({ 
        error: `Table ${tableNumber} can only accommodate ${table.capacity} people` 
      });
    }

    // Check if table is already reserved at this time
    const existingReservation = await Reservation.findOne({
      tableNumber,
      reservationDate: new Date(reservationDate),
      reservationTime,
      status: { $in: ['pending', 'confirmed', 'seated'] }
    });

    if (existingReservation) {
      return res.status(400).json({ 
        error: 'Table is already reserved for this date and time' 
      });
    }

    const reservation = new Reservation({
      tableNumber,
      customerName,
      customerPhone,
      customerEmail,
      partySize,
      reservationDate: new Date(reservationDate),
      reservationTime,
      notes
    });

    await reservation.save();
    
    res.status(201).json({ 
      message: 'Reservation created successfully',
      reservation 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reservations
reservationRouter.get('/', async (req, res) => {
  try {
    const { date, status, tableNumber } = req.query;
    let filter = {};
    
    if (date) {
      filter.reservationDate = new Date(date);
    }
    if (status) {
      filter.status = status;
    }
    if (tableNumber) {
      filter.tableNumber = parseInt(tableNumber);
    }

    const reservations = await Reservation.find(filter)
      .sort({ reservationDate: 1, reservationTime: 1 });
    
    res.json({ reservations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get reservation by ID
reservationRouter.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ reservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update reservation status
reservationRouter.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ 
      message: 'Reservation status updated',
      reservation 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update reservation details
reservationRouter.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ 
      message: 'Reservation updated successfully',
      reservation 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel reservation
reservationRouter.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ 
      message: 'Reservation cancelled successfully',
      reservation 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get available tables for a specific date and time
reservationRouter.get('/available-tables/:date/:time', async (req, res) => {
  try {
    const { date, time } = req.params;
    const { partySize } = req.query;

    // Get all tables
    const allTables = await Table.find({});

    // Get reserved tables for this date and time
    const reservedTables = await Reservation.find({
      reservationDate: new Date(date),
      reservationTime: time,
      status: { $in: ['pending', 'confirmed', 'seated'] }
    }).select('tableNumber');

    const reservedTableNumbers = reservedTables.map(r => r.tableNumber);

    // Filter available tables
    let availableTables = allTables.filter(
      table => !reservedTableNumbers.includes(table.tableNumber)
    );

    // Filter by party size if provided
    if (partySize) {
      availableTables = availableTables.filter(
        table => table.capacity >= parseInt(partySize)
      );
    }

    res.json({ 
      availableTables,
      totalAvailable: availableTables.length 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get today's reservations
reservationRouter.get('/today/list', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayReservations = await Reservation.find({
      reservationDate: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ reservationTime: 1 });

    res.json({ 
      reservations: todayReservations,
      count: todayReservations.length 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default reservationRouter;
