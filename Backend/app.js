import express from "express"
import cors from "cors"

import { RegistroUserRute,LoginRute } from "./Router/Routes.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use('/psicologia',RegistroUserRute);
app.use('/psicologia',LoginRute);

export default app;