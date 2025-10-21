import express from "express";
import { sendClientEmail } from "../controllers/clientController.js";

const clientRoute = express.Router();

// Send contact form email
clientRoute.post("/", sendClientEmail);

export default clientRoute;
