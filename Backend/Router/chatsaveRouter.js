import express from "express"
import { Chat } from "../controllers/chat.js"

const router = express.Router(); 
router.post('/ChatSave',Chat)

export default router;