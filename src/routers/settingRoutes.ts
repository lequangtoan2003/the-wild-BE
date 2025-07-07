import { Router } from 'express';
import { createSetting, getAllSettings, getSettingById, updateSetting, deleteSetting } from '../controllers/settingController'; // Adjust the import path as needed

const router = Router();

router.post('/settings', createSetting);
router.get('/settings', getAllSettings);
router.get('/settings/:id', getSettingById);
router.put('/settings/:id', updateSetting);
router.delete('/settings/:id', deleteSetting);

export default router;