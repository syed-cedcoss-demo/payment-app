import express from 'express';
import { getAllUser, getUser } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/get-user', auth, getUser);
router.get('/get-all-users', auth, getAllUser);
// router.post('/update-password', signup);

export default router;
