import express from "express";
import { ConsultaUser } from "../controllers/AdminConsultaUser.js";

const router = express.Router();

router.get('/ConsultaUser', ConsultaUser);

export default router;