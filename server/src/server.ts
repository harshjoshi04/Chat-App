import express, { Express } from "express";
import cors from "cors";
import http from "http";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import { errorHandler } from "./middleware/ErrorHandler";
import router from "./router/router";
import SocketFunction from "./utils/IoStream";

const app: Express = express();
const PORT: number = 8080;

export const Prisma = new PrismaClient();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use("/v1", router);

// Error Handler
app.use(errorHandler);

const server: http.Server = http.createServer(app);

SocketFunction(server);

server.listen(PORT, () => {
  console.log(`Server Start At ${PORT} 🚀 `);
  console.log(`DataBase Connect Successfully  🚀 `);
});
