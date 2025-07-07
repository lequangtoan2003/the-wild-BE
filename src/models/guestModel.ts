import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  full_name: string;
  email: string;
  nationality: string;
  country_flag: string;
  national_id: string;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
nationality: { type: String, default: '' }, // Giá trị mặc định là chuỗi rỗng
  country_flag: { type: String, default: '' },
  national_id: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IGuest>('Guest', GuestSchema);