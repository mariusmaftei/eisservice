# E.I.S. Service Admin Panel

This is the admin panel for the E.I.S. Service platform, built with React and designed to manage service categories dynamically.

## Features

- **Category Management**: Create, edit, delete, and manage service categories
- **Dashboard**: Overview of platform statistics and quick actions
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live data synchronization with the backend

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 8080

### Installation

1. Navigate to the admin directory:

   ```bash
   cd admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   echo "REACT_APP_API_URL=http://localhost:8080/api/admin" > .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The admin panel will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── CategoryForm/          # Category creation/editing form
│   │   ├── Layout/
│   │   │   ├── Header/            # Navigation header
│   │   │   └── Footer/           # Footer component
│   │   └── RootLayout/           # Main layout wrapper
│   ├── pages/
│   │   ├── dashboard/            # Dashboard overview
│   │   ├── admin/                # Category management
│   │   └── categories/           # Categories page
│   ├── service/
│   │   └── api.js                # API service functions
│   ├── assets/
│   │   └── images/               # Static assets
│   └── config/
│       └── contactInfo.js        # Contact information
├── public/
└── package.json
```

## API Integration

The admin panel communicates with the backend through REST API endpoints:

- `GET /api/admin/categories` - Get all categories
- `POST /api/admin/categories` - Create new category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `PATCH /api/admin/categories/:id/toggle` - Toggle category status

## Category Management

### Creating Categories

1. Navigate to Categories page
2. Click "Create New Category"
3. Fill in the required fields:
   - Slug (URL-friendly identifier)
   - Name and Display Name
   - Description and Short Description
   - Image URLs
   - Services offered
   - Why Choose Us content
   - Professional content
   - SEO information

### Editing Categories

1. Find the category in the list
2. Click "Edit" button
3. Modify the fields as needed
4. Save changes

### Category Status

- **Active**: Category is visible on the main website
- **Inactive**: Category is hidden from public view

## Styling

The admin panel uses CSS Modules for styling and follows the same design system as the main client application:

- Primary color: #174bdd (blue)
- Secondary colors: #059669 (green), #dc2626 (red)
- Typography: Clean, modern fonts
- Responsive grid layouts
- Consistent spacing and shadows

## Contributing

1. Follow the existing code style
2. Use meaningful component and variable names
3. Add comments for complex logic
4. Test your changes thoroughly
5. Ensure responsive design works on all screen sizes

## Deployment

To build for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files that can be deployed to any static hosting service.
