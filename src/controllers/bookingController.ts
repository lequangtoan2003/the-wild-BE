import { Request, Response } from 'express';
import Booking, { IBooking } from '../models/bookingModel';
import Guest from '../models/guestModel';
import Cabin from '../models/cabinModel';

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  console.log('Received body:', req.body);
  const { guest_id, cabin_id, start_date, end_date, num_nights, num_guests, cabin_price, extras_price, total_price, status, has_breakfast, is_paid, observations } = req.body;
  if (!guest_id || !cabin_id || !start_date || !end_date || !num_nights || !num_guests || !cabin_price || !total_price) {
    console.log('Missing fields:', { guest_id, cabin_id, start_date, end_date, num_nights, num_guests, cabin_price, total_price });
    res.status(400).json({
      success: false,
      rs: 'Missing inputs'
    });
    return;
  }

  // Kiểm tra tồn tại của guest và cabin
  const guest = await Guest.findById(guest_id);
  const cabin = await Cabin.findById(cabin_id);
  if (!guest || !cabin) {
    res.status(404).json({
      success: false,
      rs: 'Guest or Cabin not found'
    });
    return;
  }

  const booking = await Booking.create(req.body);
  res.status(200).json({
    success: booking ? true : false,
    rs: booking ? booking : 'Booking not created'
  });
};

export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
  const bookings = await Booking.find().populate('guest_id cabin_id');
  res.status(200).json({
    success: bookings ? true : false,
    rs: bookings ? bookings : 'Bookings not found'
  });
};

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing booking id');
  const booking = await Booking.findById(id).populate('guest_id cabin_id');
  res.status(200).json({
    success: booking ? true : false,
    rs: booking ? booking : 'Booking not found'
  });
};

export const getBookingsByGuestId = async (req: Request, res: Response): Promise<void> => {
  const { guestId } = req.query; 

  if (!guestId || typeof guestId !== 'string') {
    res.status(400).json({
      success: false,
      rs: 'Missing or invalid guest ID'
    });
    return;
  }

  try {
    // Kiểm tra xem guest có tồn tại không
    const guest = await Guest.findById(guestId);
    if (!guest) {
      res.status(404).json({
        success: false,
        rs: 'Guest not found'
      });
      return;
    }

    // Truy vấn MongoDB để lấy tất cả đặt chỗ cho guestId
    const bookings = await Booking.find({ guest_id: guestId }).populate('guest_id cabin_id');

    res.status(200).json({
      success: bookings.length > 0 ? true : false,
      rs: bookings.length > 0 ? bookings : 'No bookings found for this guest'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      rs: 'Bookings could not get loaded'
    });
  }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { guest_id, cabin_id, start_date, end_date, num_nights, num_guests, cabin_price, extras_price, total_price, status, has_breakfast, is_paid, observations } = req.body;
  if (!id) throw new Error('Missing booking id');
  if (!num_guests || !observations) {
    res.status(400).json({
      success: false,
      rs: 'Missing inputs'
    });
    return;
  }
  const updateData = { num_guests, observations}

  const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true }).lean();
   res.status(200).json({ success: true, rs: booking });
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing booking id');
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) {
    res.status(200).json({
      success: false,
      rs: 'Booking not found'
    });
  } else {
    res.status(200).json({
      success: true
    });
  }
};

export const getBookedDatesByCabinId = async (req: Request, res: Response): Promise<void> => {
  const { cabinId } = req.params;

  if (!cabinId) {
    res.status(400).json({
      success: false,
      rs: 'Missing cabin ID'
    });
    return;
  }

  try {
    // Truy vấn MongoDB để lấy tất cả đặt chỗ cho cabinId
    const bookings = await Booking.find({ cabin_id: cabinId }).select('start_date end_date status');

    res.status(200).json({
      success: true,
      rs: bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      rs: 'Bookings could not get loaded'
    });
  }
};