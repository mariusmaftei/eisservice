# EIS Service Server

This is the backend server for the EIS Service application.

## Environment Variables

### Required Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 8080)
- `JWT_SECRET`: Secret key for JWT tokens
- `ADMIN_FRONTEND_URL`: URL of the admin frontend
- `CLIENT_FRONTEND_URL`: URL of the client frontend

### Google OAuth Configuration

- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `GOOGLE_CALLBACK_URL`: Google OAuth callback URL

### Owner Email Configuration

- `OWNER_EMAIL`: Comma-separated list of emails that are allowed to access the admin panel

**Example:**

```
OWNER_EMAIL=softindexlabs@gmail.com,user@gmail.com
```

**Important:** Only emails listed in this variable will be able to access the admin panel. Users with emails not in this list will be denied access even if they authenticate with Google OAuth.

### Optional Variables

- `FIREBASE_PROJECT_ID`: Firebase project ID for file storage
- `FIREBASE_PRIVATE_KEY_ID`: Firebase private key ID
- `FIREBASE_PRIVATE_KEY`: Firebase private key
- `FIREBASE_CLIENT_EMAIL`: Firebase client email
- `FIREBASE_CLIENT_ID`: Firebase client ID
- `FIREBASE_STORAGE_BUCKET`: Firebase storage bucket name

## Security Features

### Admin Panel Access Control

The admin panel implements strict access control:

1. **Authentication Required**: Users must authenticate via Google OAuth
2. **Owner Email Validation**: Only emails listed in `OWNER_EMAIL` environment variable are allowed
3. **Admin Role Assignment**: Users with owner emails are automatically assigned admin role
4. **Middleware Protection**: All admin routes are protected with authentication and authorization middleware

### Access Denial

If a user tries to access the admin panel with an email not in the `OWNER_EMAIL` list:

- They will be denied access during Google OAuth callback
- They will be redirected to an error page with an appropriate message
- No user account will be created for unauthorized emails

## Running the Server

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables (create a `.env` file based on the variables above)

3. Start the server:
   ```bash
   npm start
   ```

## API Routes

### Authentication Routes (`/api/auth`)

- `GET /google` - Initiate Google OAuth login
- `GET /google/callback` - Google OAuth callback
- `GET /me` - Get current user info
- `GET /check` - Check authentication status
- `POST /logout` - Logout user

### Admin Routes (`/api/admin`)

All admin routes require authentication and owner email validation:

- `GET /categories` - Get all categories
- `POST /categories` - Create new category
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category
- `PATCH /categories/:id/toggle` - Toggle category status
