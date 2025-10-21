import express from "express";
import { sendProviderEmail } from "../controllers/providerController.js";

const providerRoute = express.Router();

// Send contact form email
providerRoute.post("/", sendProviderEmail);

export default providerRoute;
