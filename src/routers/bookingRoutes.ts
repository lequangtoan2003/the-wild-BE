import { Router } from 'express';
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking, getBookedDatesByCabinId, getBookingsByGuestId } from '../controllers/bookingController';

const router = Router();

router.post('/bookings', createBooking);
router.get('/bookings', getAllBookings);
router.get('/bookings/:id', getBookingById);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);
router.get('/bookings/cabin/:cabinId/booked-dates', getBookedDatesByCabinId);
router.get('/bookings', getBookingsByGuestId)

export default router;