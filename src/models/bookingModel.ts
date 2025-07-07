import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  guest_id: mongoose.Types.ObjectId;
  cabin_id: mongoose.Types.ObjectId;
  start_date: Date;
  end_date: Date;
  num_nights: number;
  num_guests: number;
  cabin_price: number;
  extras_price: number;
  total_price: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  has_breakfast: boolean;
  is_paid: boolean;
  observations?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    guest_id: { type: Schema.Types.ObjectId, ref: 'Guest', required: true },
    cabin_id: { type: Schema.Types.ObjectId, ref: 'Cabin', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    num_nights: { type: Number, required: true },
    num_guests: { type: Number, required: true },
    cabin_price: { type: Number, required: true },
    extras_price: { type: Number, default: 0 },
    total_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['unconfirmed', 'checked-in', 'checked-out', 'cancelled'],
      default: 'unconfirmed',
    },
    has_breakfast: { type: Boolean, default: false },
    is_paid: { type: Boolean, default: false },
    observations: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);