// src/server/server.js
import express from "express";
import cookieParser from "cookie-parser";
import { cors, rateLimiter, morgan } from "#middleware";
import ENV from "#env";

const app = express();

app.use(cors({ origin: ENV.CORS, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(rateLimiter);
app.use(morgan("dev"));

export default app;