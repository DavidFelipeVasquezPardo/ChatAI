import express from "express"
import cors from "cors"

import { RegistroUserRute,LoginRute,ChatAIRute,chatsaveRute,AllChatsRute } from "./Router/Routes.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use('/psicologia',RegistroUserRute);
app.use('/psicologia',LoginRute);
app.use('/psicologia',ChatAIRute);
app.use('/psicologia',chatsaveRute);
app.use('/psicologia',AllChatsRute);

export default app;