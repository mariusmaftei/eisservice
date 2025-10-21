import express from "express";
import {
  getPrivacyPolicy,
  getTermsOfService,
  recordConsent,
} from "../controllers/policyController.js";

const policyRoute = express.Router();

// Get privacy policy
policyRoute.get("/privacy", getPrivacyPolicy);

// Get terms of service
policyRoute.get("/terms", getTermsOfService);

// Record user consent
policyRoute.post("/consent", recordConsent);

export default policyRoute;
