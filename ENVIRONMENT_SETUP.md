# Environment Setup Guide

## Required Environment Variables

To run the server properly, you need to create a `.env` file in the `server` directory with the following variables:

### Basic Server Configuration

```env
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eisservice
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_FRONTEND_URL=http://localhost:3000
```

### Email Configuration (Required for email functionality)

```env
MAIL_HOST=smtp.gmail.com
CLIENT_EMAIL=clients@eisservice.com
CLIENT_PASSWORD=your-client-app-password
PROVIDER_EMAIL=providers@eisservice.com
PROVIDER_PASSWORD=your-provider-app-password
ADMIN_EMAIL=admin@eisservice.com
```

### Google OAuth Configuration (Optional)

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback
```

### Firebase Configuration (Optional - for file uploads)

```env
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-firebase-private-key\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_CLIENT_ID=your-firebase-client-id
FIREBASE_STORAGE_BUCKET=your-firebase-project-id.firebasestorage.app
```

## Setup Instructions

1. **Create the .env file**: Copy the above content into a new file called `.env` in the `server` directory
2. **Update the values**: Replace all placeholder values with your actual credentials
3. **Email Setup**: For Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate app-specific passwords for each email account
   - Use these app passwords in the `CLIENT_PASSWORD` and `PROVIDER_PASSWORD` fields

## Current Issues Fixed

- ✅ Fixed Mongoose duplicate index warnings
- ⚠️ Firebase credentials not provided (optional feature)
- ⚠️ SMTP authentication errors (need valid email credentials)

## Next Steps

1. Create the `.env` file with your actual credentials
2. Set up Gmail app passwords for email functionality
3. Optionally configure Firebase for file upload features
4. Optionally configure Google OAuth for authentication
