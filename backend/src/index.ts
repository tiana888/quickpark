import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server as SocketIOServer } from "socket.io";

import CardRoutes from "./routes/cards";
import ListRoutes from "./routes/lists";
import SpaceRoutes from "./routes/spaces";
import UserRoutes from "./routes/users";
import { env } from "./utils/env";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/users", UserRoutes);
app.use("/api/spaces", SpaceRoutes);
app.use("/api/cards", CardRoutes);
app.use("/api/lists", ListRoutes);
app.get("/heartbeat", (_, res) => res.send({ message: "Hello World!" }));

// Connect to MongoDB
mongoose
  .connect(env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.log("Failed to connect to MongoDB");
    console.error(error.message);
  });

// Create HTTP server and configure it with the express app
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

// Listen on the environment port or 3001
const port = env.PORT;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

io.on("connection", (socket) => {
  socket.on("spaces-updated", () => {
    console.log("spaces-updated");
    io.emit("re-render");
  });
});
