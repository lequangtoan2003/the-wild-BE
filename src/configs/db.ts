import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGOURL = process.env.MONGGO_URI || 'mongodb://localhost:27017/menn';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log('✅Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};