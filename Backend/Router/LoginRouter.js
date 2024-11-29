import express from "express"
import { Login } from "../controllers/Login.js"

const router = express.Router();
router.post('/Login',Login)

export default router;