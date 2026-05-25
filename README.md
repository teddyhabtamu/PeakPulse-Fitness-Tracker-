# PeakPulse - Fitness Tracker

Track workouts, log exercises, monitor progress, and crush your fitness goals. PeakPulse is a full-stack fitness tracking web app with a responsive PWA frontend and a RESTful API backend.

## Features

- **Workout Logging** — Add, edit, and delete workout entries with exercises, sets, reps, and weights
- **Progress Tracking** — Interactive charts and stats to visualize your gains over time
- **Exercise Library** — Browse and select from a predefined exercise catalog
- **Personal Records** — Automatically detected PR tracking per exercise
- **Streak Tracking** — Daily workout streaks to keep you motivated
- **Dashboard** — Weekly summaries, category breakdowns, and counts at a glance
- **User Authentication** — JWT-based sign up / sign in, plus Google OAuth
- **Blog System** — Admin-managed fitness articles with image uploads
- **Dark / Light Theme** — Toggle between themes with persistent preference
- **Responsive Design** — Works seamlessly on mobile and desktop
- **Admin Dashboard** — Admin panel for user and blog management
- **PWA** — Installable as a native app with offline caching
- **SEO Optimized** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Create React App |
| **UI** | Material UI 5, styled-components |
| **State** | Redux Toolkit, Redux Persist |
| **Routing** | React Router v6 |
| **Backend** | Node.js, Express 4 |
| **Database** | PostgreSQL |
| **Auth** | JWT, bcryptjs, Google OAuth |
| **Storage** | Supabase Storage (blog images) |
| **Charts** | MUI X-Charts |
| **HTTP** | Axios |

## Project Structure

```
PeakPulse-Fitness-Tracker/
├── client/                        # React frontend
│   ├── public/
│   │   ├── index.html             # SEO-optimized entry with meta/OG/JSON-LD
│   │   ├── manifest.json          # PWA manifest
│   │   ├── service-worker.js      # Service worker for caching & offline
│   │   ├── sitemap.xml            # XML sitemap for crawlers
│   │   ├── robots.txt             # Crawler directives
│   │   └── Logo.png               # App logo
│   └── src/
│       ├── App.js                 # Root component with routing & auth
│       ├── index.js               # Entry point with SW registration
│       ├── components/            # Reusable UI components
│       │   ├── InstallPopup.jsx   # PWA install prompt dialog
│       │   ├── Navbar.jsx         # Sidebar navigation
│       │   ├── SignIn.jsx         # Login form
│       │   ├── SignUp.jsx         # Registration form
│       │   ├── WorkoutCard.jsx    # Workout entry card
│       │   └── ...
│       ├── pages/                 # Page components
│       │   ├── Home.jsx           # Landing page (unauthenticated)
│       │   ├── Dashboard.jsx      # Main dashboard (authenticated)
│       │   ├── Workouts.jsx       # Workout log
│       │   ├── Authentication.jsx # Auth pages
│       │   ├── Blogs.jsx          # Blog listing
│       │   └── ...
│       └── utils/
│           ├── Themes.js          # Light/dark theme definitions
│           └── api.js             # Axios instance
├── server/                        # Express backend
│   ├── index.js                   # Server entry (all routes)
│   ├── db.js                      # PostgreSQL connection pool
│   ├── controllers/               # Route handlers
│   └── routes/                    # Express routers
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/teddyhabtamu/PeakPulse-Fitness-Tracker.git
   cd PeakPulse-Fitness-Tracker
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables

   **Server** (`server/.env`):
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/peakpulse
   JWT_SECRET=your_jwt_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   CLIENT_URL=http://localhost:3000
   ```

   **Client** (`client/.env`):
   ```env
   REACT_APP_BASE_URL=http://localhost:5000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

5. Initialize the database
   ```bash
   cd server
   node migrate.js
   ```

6. Start the server
   ```bash
   cd server
   npm run dev
   ```

7. Start the client (in a new terminal)
   ```bash
   cd client
   npm start
   ```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register |
| POST | `/api/auth/signin` | Login |
| POST | `/api/auth/google` | Google OAuth |
| GET | `/api/workouts` | Get user workouts |
| POST | `/api/workouts` | Add workout |
| PUT | `/api/workouts/:id` | Update workout |
| DELETE | `/api/workouts/:id` | Delete workout |
| GET | `/api/dashboard` | Dashboard stats |
| GET | `/api/blogs` | Get blog posts |
| POST | `/api/blogs` | Create blog (admin) |
| PUT | `/api/profile` | Update profile |

## PWA

PeakPulse is a fully installable Progressive Web App:

- **`manifest.json`** — Web app manifest with icons and theme color
- **`service-worker.js`** — Precaches core assets, caches on fetch, cleans stale caches
- **Install Popup** — Native `beforeinstallprompt` event triggers a MUI dialog prompting users to install

## SEO

The site is optimized for search engines:

- **Meta tags** — Title, description, keywords, robots directives
- **Open Graph** — `og:title`, `og:description`, `og:image`, `og:url` for social sharing
- **Twitter Cards** — `summary_large_image` card
- **JSON-LD** — `WebApplication` and `BreadcrumbList` structured data
- **Sitemap** — `sitemap.xml` listing public routes
- **Robots** — `robots.txt` allowing all crawlers with sitemap reference
- **Google Search Console** — Verified via meta tag and verification file

## Deployment

### Frontend (Vercel / Netlify)

```bash
cd client
npm run build
```

Deploy the `client/build` directory.

### Backend (Vercel as serverless)

```bash
cd server
vercel --prod
```

The `vercel.json` in the server directory configures the Express app for serverless deployment.

## License

MIT
