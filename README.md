# All Rummy Apps - Game Rummy Website

A modern Next.js website for displaying rummy and gaming apps with a comprehensive admin panel for managing games.

## Features

- 🎮 **Game Listing**: Display games in Hot Games and Recommended sections
- 🔥 **Hot Games**: Special section for trending/popular games
- 🎨 **Modern UI**: Built with Next.js, TypeScript, and Tailwind CSS
- 👨‍💼 **Admin Panel**: Full CRUD operations for game management
- 🔒 **Admin Authentication**: Secure admin login
- 📱 **Responsive Design**: Mobile-friendly interface
- ⚡ **Fast Performance**: Optimized with Next.js App Router

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoint
│   │   │   └── games/      # Game CRUD endpoints
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Footer component
│   │   ├── GameCard.tsx    # Individual game card
│   │   └── GameList.tsx    # Game list grid
│   ├── lib/
│   │   ├── games.ts        # Game data management functions
│   │   └── data.json       # Game data storage (JSON file)
│   └── types/
│       └── game.ts         # TypeScript interfaces
└── public/
    └── games/              # Game images directory
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Admin Panel

### Access Admin Panel

1. Navigate to `/admin` in your browser
2. Login with password: `admin123` (default)
3. **Important**: Change the password in production by updating `/src/app/api/auth/route.ts`

### Admin Features

- **Add Games**: Click "Add New Game" button
- **Edit Games**: Click "Edit" button on any game
- **Delete Games**: Click "Delete" button on any game
- **Mark as Hot**: Toggle "Mark as Hot Game" checkbox to show games in Hot Games section

### Game Fields

- **Name**: Game name (required)
- **Description**: Game description (required)
- **Category**: Game category (e.g., Rummy, Casino, Gaming)
- **Image URL**: Path to game image (e.g., `/games/game-name.jpg`)
- **Download URL**: Link to download the game
- **Rating**: Rating from 1-5 stars
- **Is Hot**: Checkbox to show in Hot Games section

## API Endpoints

### Games API (`/api/games`)

- **GET**: Fetch all games
- **POST**: Create new game
- **PUT**: Update existing game
- **DELETE**: Delete game (with `?id=gameId`)

### Auth API (`/api/auth`)

- **POST**: Authenticate admin (requires password in body)

## Data Storage

Games are stored in `src/lib/data.json`. For production, consider using a proper database (MongoDB, PostgreSQL, etc.).

## Customization

### Change Admin Password

Edit `src/app/api/auth/route.ts`:

```typescript
const ADMIN_PASSWORD = "your-secure-password";
```

### Add Game Images

1. Place images in `public/games/` directory
2. Use path like `/games/image-name.jpg` in admin panel

### Styling

The project uses Tailwind CSS. Modify styles in component files or update `src/app/globals.css`.

## Production Deployment

1. Change admin password
2. Set up proper authentication (JWT, sessions, etc.)
3. Consider using a database instead of JSON file
4. Add environment variables for sensitive data
5. Deploy to Vercel, Netlify, or your preferred platform

## License

This project is for educational/demo purposes.
