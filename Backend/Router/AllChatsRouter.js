import express from "express"
import { AllChats } from "../controllers/AllChats.js";
const router = express.Router();
router.post('/AllChats',AllChats)

export default router;