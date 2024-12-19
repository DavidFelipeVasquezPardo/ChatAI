import express from "express";
import cors from "cors";

import { RegistroUserRute, LoginRute, ChatAIRute, chatsaveRute, AllChatsRute, CargarChatRute, DeleteChatRute, AdminConsultasUserRouter } from "./Router/Routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/psicologia', RegistroUserRute);
app.use('/psicologia', LoginRute);
app.use('/psicologia', ChatAIRute);
app.use('/psicologia', chatsaveRute);
app.use('/psicologia', AllChatsRute);
app.use('/psicologia', CargarChatRute);
app.use('/psicologia', DeleteChatRute);
app.use('/psicologia', AdminConsultasUserRouter);

export default app;