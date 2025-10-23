import express from "express";
import {
  googleLogin,
  googleCallback,
  getCurrentUser,
  logout,
  checkAuth,
  isAuthenticated,
  isAdmin,
  isOwnerEmail,
  getAllUsers,
  updateUserRole,
  checkOAuthStatus,
} from "../controllers/authController.js";

const router = express.Router();

// Google OAuth routes
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

// Authentication status routes
router.get("/me", getCurrentUser);
router.get("/check", checkAuth);
router.get("/status", checkOAuthStatus);
router.post("/logout", logout);

// Admin routes (protected with owner email check)
router.get("/users", isAuthenticated, isOwnerEmail, isAdmin, getAllUsers);
router.put(
  "/users/:userId/role",
  isAuthenticated,
  isOwnerEmail,
  isAdmin,
  updateUserRole
);

export default router;
