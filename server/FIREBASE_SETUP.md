# Firebase Admin SDK Setup Guide

This guide explains how to set up Firebase Admin SDK for image uploads in the EIS Service backend.

## Environment Variables Required

Add these environment variables to your `.env` file:

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
```

## How to Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Extract the values from the JSON file:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key_id` → `FIREBASE_PRIVATE_KEY_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `client_id` → `FIREBASE_CLIENT_ID`

## Firebase Storage Setup

1. In Firebase Console, go to Storage
2. Create a bucket if you don't have one
3. Set up security rules (example below)

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }

    // Allow write access only to authenticated users
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

## API Endpoints

### Upload Single Image

```
POST /api/upload/image
Content-Type: multipart/form-data

Body:
- image: file (required)
- folder: string (optional, default: 'uploads')
- category: string (optional)
```

### Upload Multiple Images

```
POST /api/upload/images
Content-Type: multipart/form-data

Body:
- images: files[] (required, max 5)
- folder: string (optional, default: 'uploads')
- category: string (optional)
```

### Upload Category Image

```
POST /api/upload/category-image
Content-Type: multipart/form-data

Body:
- image: file (required)
- categoryId: string (required)
- categoryName: string (required)
```

### Delete Image

```
DELETE /api/upload/image/:fileName
```

### Get Image URL

```
GET /api/upload/image/:fileName/url
```

### List Images

```
GET /api/upload/images?folder=uploads&limit=50
```

## Usage Examples

### Upload Category Image (Frontend)

```javascript
const formData = new FormData();
formData.append("image", file);
formData.append("categoryId", categoryId);
formData.append("categoryName", categoryName);

const response = await fetch("/api/upload/category-image", {
  method: "POST",
  body: formData,
});

const result = await response.json();
console.log(result.data.downloadURL); // Use this URL in your app
```

### Upload Multiple Images

```javascript
const formData = new FormData();
files.forEach((file) => {
  formData.append("images", file);
});
formData.append("folder", "services");
formData.append("category", "plumbing");

const response = await fetch("/api/upload/images", {
  method: "POST",
  body: formData,
});

const result = await response.json();
// result.data is an array of upload results
```

## File Validation

The system automatically validates:

- File types: jpeg, jpg, png, webp, gif
- File size: maximum 5MB
- Maximum files per request: 5

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Installation

Make sure to install the required dependencies:

```bash
cd server
npm install firebase-admin multer
```

The dependencies are already added to `package.json`.
