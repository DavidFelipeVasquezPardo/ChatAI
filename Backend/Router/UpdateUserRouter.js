import express from 'express';
import { UpdateUser } from '../controllers/UpdateUser.js';

const router = express.Router();

router.put('/updateUser', UpdateUser);

export default router;