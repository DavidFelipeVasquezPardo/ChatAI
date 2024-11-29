import express from "express"
import { ChatAI } from "../ControllersAI/ChatAI.js"

const router = express.Router();
router.post('/ChatAI',ChatAI)

export default router;