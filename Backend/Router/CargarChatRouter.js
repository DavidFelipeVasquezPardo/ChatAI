import express from "express"
import { CargarChat } from "../controllers/CargarChat.js";
const router = express.Router();
router.post('/CargarChat',CargarChat)

export default router;