import { Request, Response } from 'express';
import Cabin, { ICabin } from '../models/cabinModel';

export const createCabin = async (req: Request, res: Response): Promise<void> => {
    console.log('Received body:', req.body);
const { name, max_capacity, regular_price, discount, image } = req.body;
if (!name || !max_capacity || !regular_price) {
  console.log('Missing fields:', { name, max_capacity, regular_price, image });
  res.status(400).json({
    success: false,
    rs: 'Missing inputs'
  });
  return;
}
    const cabin = await Cabin.create(req.body);
    res.status(200).json({
        success: cabin ? true : false,
        rs: cabin ? cabin : 'Cabin not created'
    });
};

export const getAllCabins = async (req: Request, res: Response): Promise<void> => {
    const cabins = await Cabin.find();
    res.status(200).json({
        success: cabins ? true : false,
        rs: cabins ? cabins : 'Cabins not found'
    });
};

export const getCabinById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) throw new Error('Missing cabin id');
    const cabin = await Cabin.findById(id);
    res.status(200).json({
        success: cabin ? true : false,
        rs: cabin ? cabin : 'Cabin not found'
    });
};

export const updateCabin = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, max_capacity, regular_price, discount, image } = req.body;
    if (!id) throw new Error('Missing cabin id');
    if (!name || !max_capacity || !regular_price) {
        res.status(400).json({
            success: false,
            rs: 'Missing inputs'
        });
        return;
    }
    const cabin = await Cabin.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        success: cabin ? true : false,
        rs: cabin ? cabin : 'Cabin not found'
    });
};

export const deleteCabin = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  if (!id) throw new Error('Missing cabin id');
  const cabin = await Cabin.findByIdAndDelete(id);
  if (!cabin) {
    res.status(200).json({
      success: false,
      rs: 'Cabin not found'
    });
  } else {
    res.status(200).json({
      success: true
    });
  }
};