import passport from "passport";
import User from "../models/User.js";

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: "Authentication required",
  });
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({
    success: false,
    message: "Admin access required",
  });
};

// Middleware to check if user email is in owner emails list
export const isOwnerEmail = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  const ownerEmails =
    process.env.OWNER_EMAIL?.split(",").map((email) => email.trim()) || [];
  const userEmail = req.user.email;

  if (!ownerEmails.includes(userEmail)) {
    console.log(
      `Access denied for email: ${userEmail}. Not in owner emails list.`
    );
    return res.status(403).json({
      success: false,
      message:
        "Access denied. Your email is not authorized to access the admin panel.",
    });
  }

  next();
};

// Google OAuth login
export const googleLogin = (req, res, next) => {
  // Check if Google OAuth is configured
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL ||
    process.env.GOOGLE_CLIENT_ID === "your-google-client-id"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Google OAuth is not configured. Please set up Google OAuth credentials in your environment variables.",
    });
  }

  // Only call passport.authenticate if Google strategy is configured
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
};

// Google OAuth callback
export const googleCallback = (req, res, next) => {
  // Check if Google OAuth is configured
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET ||
    !process.env.GOOGLE_CALLBACK_URL ||
    process.env.GOOGLE_CLIENT_ID === "your-google-client-id"
  ) {
    return res.redirect(
      `${
        process.env.ADMIN_FRONTEND_URL
      }/auth/error?message=${encodeURIComponent(
        "Google OAuth is not configured"
      )}`
    );
  }

  passport.authenticate("google", (err, user, info) => {
    if (err) {
      console.error("Google OAuth error:", err);
      return res.redirect(
        `${
          process.env.ADMIN_FRONTEND_URL
        }/auth/error?message=${encodeURIComponent(err.message)}`
      );
    }

    if (!user) {
      const errorMessage = info?.message || "Authentication failed";
      console.log("Authentication failed:", errorMessage);

      // Check if it's an access denied error (unauthorized email)
      if (
        errorMessage.includes("Access denied") ||
        errorMessage.includes("not authorized")
      ) {
        return res.redirect(`${process.env.ADMIN_FRONTEND_URL}/access-denied`);
      }

      return res.redirect(
        `${
          process.env.ADMIN_FRONTEND_URL
        }/auth/error?message=${encodeURIComponent(errorMessage)}`
      );
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.redirect(
          `${
            process.env.ADMIN_FRONTEND_URL
          }/auth/error?message=${encodeURIComponent(err.message)}`
        );
      }

      // Redirect to admin dashboard on successful login
      return res.redirect(`${process.env.ADMIN_FRONTEND_URL}/dashboard`);
    });
  })(req, res, next);
};

// Get current user
export const getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        displayName: req.user.displayName,
        profilePicture: req.user.profilePicture,
        role: req.user.role,
        lastLogin: req.user.lastLogin,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
};

// Logout
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({
        success: false,
        message: "Logout failed",
      });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({
          success: false,
          message: "Session cleanup failed",
        });
      }

      res.clearCookie("connect.sid"); // Clear session cookie
      res.json({
        success: true,
        message: "Logged out successfully",
      });
    });
  });
};

// Check authentication status
export const checkAuth = (req, res) => {
  res.json({
    success: true,
    isAuthenticated: req.isAuthenticated(),
    user: req.isAuthenticated()
      ? {
          id: req.user._id,
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          displayName: req.user.displayName,
          profilePicture: req.user.profilePicture,
          role: req.user.role,
        }
      : null,
  });
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      {
        password: 0, // Exclude password field if it exists
      }
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'admin' or 'user'",
      });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

// Check OAuth configuration status
export const checkOAuthStatus = (req, res) => {
  const isGoogleOAuthConfigured = !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CALLBACK_URL &&
    process.env.GOOGLE_CLIENT_ID !== "your-google-client-id"
  );

  res.json({
    success: true,
    googleOAuth: {
      available: isGoogleOAuthConfigured,
      message: isGoogleOAuthConfigured
        ? "Google OAuth is configured and available"
        : "Google OAuth is not configured. Please set up Google OAuth credentials in your environment variables.",
    },
  });
};
