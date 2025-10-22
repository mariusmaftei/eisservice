# EIS Service - SSR Implementation

This project now includes Server-Side Rendering (SSR) for dynamic contact options pages to improve SEO.

## Setup Instructions

### 1. Database Configuration

Create a `.env` file in the root directory with the following content:

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/eisservice
NODE_ENV=development
```

### 2. Install Dependencies

```bash
# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
```

### 3. Database Setup

Make sure MongoDB is running on your system, then seed the database:

```bash
cd server
npm run seed
```

This will create sample categories in your database.

### 4. Build the React App

```bash
cd client
npm run build
```

### 5. Start the Server

```bash
cd server
npm start
```

## How SSR Works

### Dynamic Routes

The server now handles dynamic routes for contact options:

- `/contact-option/:categorySlug` - SSR route that fetches category data and renders the page
- `/api/categories/:slug` - API endpoint to fetch category data

### Category Data Structure

Each category in the database contains:

```javascript
{
  slug: "zugrav-brasov",
  name: "zugrav",
  displayName: "Zugrav Brașov",
  description: "Servicii profesionale de zugrăvit și vopsitorie în Brașov",
  image: "/path/to/image.png",
  workingImage: "/path/to/working-image.png",
  services: [
    {
      title: "Service Title",
      description: "Service description"
    }
  ],
  whyChooseUs: {
    title: "Why choose us title",
    paragraphs: ["Paragraph 1", "Paragraph 2"]
  },
  professionalContent: {
    title: "Professional content title",
    paragraphs: ["Content paragraph 1", "Content paragraph 2"]
  },
  seo: {
    title: "SEO Title",
    description: "SEO Description",
    keywords: ["keyword1", "keyword2"]
  }
}
```

### SEO Benefits

- Each dynamic page has unique meta tags
- Content is rendered server-side for better SEO
- Dynamic titles and descriptions based on category data
- Structured data for search engines

### Adding New Categories

To add a new category, you can:

1. Use the API endpoint `POST /api/categories` with the category data
2. Add it directly to the database
3. Update the seeding script and re-run it

### Development vs Production

- **Development**: Use `npm run dev` for hot reloading
- **Production**: Build the React app first (`npm run build`), then start the server

## API Endpoints

- `GET /api/categories` - Get all active categories
- `GET /api/categories/:slug` - Get specific category by slug
- `POST /api/categories` - Create new category (admin)
- `PUT /api/categories/:slug` - Update category (admin)
- `DELETE /api/categories/:slug` - Delete category (admin)

## File Structure

```
server/
├── models/
│   └── Category.js          # Category data model
├── routes/
│   └── categoryRoutes.js    # Category API routes
├── scripts/
│   └── seedDatabase.js      # Database seeding script
├── utils/
│   └── ssr.js              # SSR rendering utility
└── server.js               # Main server file

client/
├── src/
│   ├── context/
│   │   └── CategoryContext.js  # Category data context
│   └── pages/
│       └── contact-option/
│           └── ContactOptionsPage.js  # Dynamic page component
```

## Testing SSR

1. Start the server
2. Visit `http://localhost:8080/contact-option/zugrav-brasov`
3. View page source to see server-rendered content
4. Check that meta tags are properly set for SEO

