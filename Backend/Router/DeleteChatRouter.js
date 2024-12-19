import express from 'express';
import { DeleteChat } from '../controllers/DeleteChat.js';

const router = express.Router();

router.delete('/delete-chat', DeleteChat);

export default router;