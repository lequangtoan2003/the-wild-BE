import mongoose, { Schema, Document } from 'mongoose';

export interface ICabin extends Document {
  name: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description?: string;
  image?: string;
  createdAt: Date;
  updatedAt?: Date;
}

const CabinSchema = new Schema<ICabin>(
  {
    name: { type: String, required: true, unique: true },
    max_capacity: { type: Number, required: true },
    regular_price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ICabin>('Cabin', CabinSchema);