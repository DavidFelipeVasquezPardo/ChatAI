import express from "express"
import { RegistroUser } from "../controllers/RegistroUser.js"

const router = express.Router();
router.post('/RegistroUser',RegistroUser)

export default router