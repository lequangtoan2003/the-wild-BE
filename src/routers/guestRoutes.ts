import { Router } from 'express';
import { createGuest, getAllGuests, getGuestById, updateGuest, deleteGuest, getGuestByEmail } from '../controllers/guestController';

const router = Router();

router.post('/guests', createGuest);
router.get('/guests', getAllGuests);
router.get('/guests/:id', getGuestById);
router.put('/guests', updateGuest); 
router.delete('/guests/:id', deleteGuest);
router.get('/get-by-email', getGuestByEmail);


export default router;