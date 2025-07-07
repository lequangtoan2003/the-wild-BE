import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document
{
min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking?: number;
  breakfast_price?: number;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>(
  {
    min_booking_length: { type: Number, required: true },
    max_booking_length: { type: Number, required: true },
    max_guests_per_booking: { type: Number, required: true },
    breakfast_price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISetting>('Setting', SettingSchema);