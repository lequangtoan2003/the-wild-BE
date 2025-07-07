import { Request, Response } from 'express';
import Guest, { IGuest } from '../models/guestModel';
import { Types } from 'mongoose';

export const createGuest = async (req: Request, res: Response): Promise<void> => {
  console.log('Received body:', req.body);
  const { full_name, email, nationality, country_flag, national_id } = req.body;
  if (!full_name || !email) {
    console.log('Missing fields:', { full_name, email, nationality, country_flag, national_id });
    res.status(400).json({
      success: false,
      rs: 'Missing inputs'
    });
    return;
  }
  try {
    const guest = await Guest.create(req.body);
    console.log('Guest created:', guest); // Thêm log để kiểm tra
    res.status(200).json({
      success: guest ? true : false,
      rs: guest ? guest : 'Guest not created'
    });
  } catch (error) {
    console.error('Error creating guest:', error);
    res.status(500).json({
      success: false,
      rs: 'Server error'
    });
  }
};
export const getGuestByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.query;
    if (!email) {
      res.status(400).json(null);
      return;
    }
    const guest = await Guest.findOne({ email }).lean();
    console.log('Guest by email:', guest); // Debug
    res.status(200).json(guest || null);
  } catch (error) {
    console.error('Error fetching guest by email:', error);
    res.status(500).json(null);
  }
};

export const getAllGuests = async (req: Request, res: Response): Promise<void> => {
  const guests = await Guest.find();
  res.status(200).json({
    success: guests ? true : false,
    rs: guests ? guests : 'Guests not found'
  });
};

export const getGuestById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing guest id');
  const guest = await Guest.findById(id);
  res.status(200).json({
    success: guest ? true : false,
    rs: guest ? guest : 'Guest not found'
  });
};

export const updateGuest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { guestId } = req.query;
    console.log('Received guestId:', guestId); // Debug

    // Kiểm tra guestId
    if (!guestId || typeof guestId !== 'string' || !Types.ObjectId.isValid(guestId)) {
      res.status(400).json({ success: false, rs: 'Invalid or missing guest ID' });
      return;
    }

    const { nationality = '', country_flag = '', national_id = '' } = req.body;

    // Kiểm tra định dạng national_id
    if (national_id && !/^[a-zA-Z0-9]{6,12}$/.test(national_id)) {
      res.status(400).json({ success: false, rs: 'National ID must be 6-12 alphanumeric characters' });
      return;
    }

    const updateData = { nationality, country_flag, national_id };
    const guest = await Guest.findByIdAndUpdate(guestId, updateData, { new: true }).lean();

    if (!guest) {
      res.status(404).json({ success: false, rs: 'Guest not found' });
      return;
    }

    res.status(200).json({ success: true, rs: guest });
  } catch (error) {
    console.error('Error updating guest:', error);
    res.status(500).json({ success: false, rs: 'Server error' });
  }
};

export const deleteGuest = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing guest id');
  const guest = await Guest.findByIdAndDelete(id);
  if (!guest) {
    res.status(200).json({
      success: false,
      rs: 'Guest not found'
    });
  } else {
    res.status(200).json({
      success: true
    });
  }
};