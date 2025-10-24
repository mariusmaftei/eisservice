import dotenv from "dotenv";
dotenv.config({ debug: false });

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// Configure Google OAuth Strategy only if credentials are provided
if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL &&
  process.env.GOOGLE_CLIENT_ID !== "your-google-client-id"
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google profile:", profile);

          const userEmail = profile.emails[0].value;

          // Check if user email is in the allowed owner emails list
          const ownerEmails =
            process.env.OWNER_EMAIL?.split(",").map((email) => email.trim()) ||
            [];
          const isOwnerEmail = ownerEmails.includes(userEmail);

          if (!isOwnerEmail) {
            console.log(
              `Access denied for email: ${userEmail}. Not in owner emails list.`
            );
            return done(null, false, {
              message:
                "Access denied. Your email is not authorized to access the admin panel.",
            });
          }

          // Check if user already exists with this Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            // Update last login and ensure admin role for owner emails
            user.lastLogin = new Date();
            if (isOwnerEmail) {
              user.role = "admin";
            }
            await user.save();
            return done(null, user);
          }

          // Check if user exists with same email
          user = await User.findOne({ email: userEmail });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            user.profilePicture =
              profile.photos[0]?.value || user.profilePicture;
            user.lastLogin = new Date();
            if (isOwnerEmail) {
              user.role = "admin";
            }
            await user.save();
            return done(null, user);
          }

          // Create new user with admin role if it's an owner email
          user = new User({
            googleId: profile.id,
            email: userEmail,
            firstName: profile.name.givenName || profile.displayName || "User",
            lastName: profile.name.familyName || "Name",
            displayName: profile.displayName,
            profilePicture: profile.photos[0]?.value,
            role: isOwnerEmail ? "admin" : "user",
            lastLogin: new Date(),
          });

          await user.save();
          return done(null, user);
        } catch (error) {
          console.error("Error in Google OAuth strategy:", error);
          return done(error, null);
        }
      }
    )
  );

  // Google OAuth strategy configured successfully
} else {
  // Google OAuth credentials not provided - Google login disabled
}

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
