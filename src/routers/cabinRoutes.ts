import { Router } from 'express';
import { createCabin, getAllCabins, getCabinById, updateCabin, deleteCabin } from '../controllers/cabinController';

const router = Router();

router.post('/cabins', createCabin);
router.get('/cabins', getAllCabins);
router.get('/cabins/:id', getCabinById);
router.put('/cabins/:id', updateCabin);
router.delete('/cabins/:id', deleteCabin);

export default router;