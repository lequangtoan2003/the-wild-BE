import { Request, Response } from 'express';
import Setting, { ISetting } from '../models/settingModel'; // Adjust the import path as needed

export const createSetting = async (req: Request, res: Response): Promise<void> => {
  console.log('Received body:', req.body);
  const { min_booking_length, max_booking_length, max_guests_per_booking, breakfast_price } = req.body;
  if (!min_booking_length || !max_booking_length || !max_guests_per_booking || !breakfast_price) {
    console.log('Missing fields:', { min_booking_length, max_booking_length, max_guests_per_booking, breakfast_price });
    res.status(400).json({
      success: false,
      rs: 'Missing inputs'
    });
    return;
  }
  const setting = await Setting.create(req.body);
  res.status(200).json({
    success: setting ? true : false,
    rs: setting ? setting : 'Setting not created'
  });
};

export const getAllSettings = async (req: Request, res: Response): Promise<void> => {
  const settings = await Setting.find();
  res.status(200).json({
    success: settings ? true : false,
    rs: settings ? settings : 'Settings not found'
  });
};

export const getSettingById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing setting id');
  const setting = await Setting.findById(id);
  res.status(200).json({
    success: setting ? true : false,
    rs: setting ? setting : 'Setting not found'
  });
};

export const updateSetting = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { min_booking_length, max_booking_length, max_guests_per_booking, breakfast_price } = req.body;
  if (!id) throw new Error('Missing setting id');
  if (!min_booking_length || !max_booking_length || !max_guests_per_booking || !breakfast_price) {
    res.status(400).json({
      success: false,
      rs: 'Missing inputs'
    });
    return;
  }
  const setting = await Setting.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    success: setting ? true : false,
    rs: setting ? setting : 'Setting not found'
  });
};

export const deleteSetting = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing setting id');
  const setting = await Setting.findByIdAndDelete(id);
  if (!setting) {
    res.status(200).json({
      success: false,
      rs: 'Setting not found'
    });
  } else {
    res.status(200).json({
      success: true
    });
  }
};