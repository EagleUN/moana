import express from "express";
import router from "./controllers/Index";

const app = express();

app.use("/", router);

export default app;
