# MediaHub

MediaHub is a media-sharing web application where users can explore and share music and videos. It also includes user profiles, authentication, news, and an admin area for managing users and uploaded media.

## Features

- User registration and login
- Browse and search music and videos
- Upload music, video, and thumbnails
- View individual media details
- User profiles with uploaded media
- Like, dislike, and playlist functionality
- News section with category-based headlines
- Admin area for user and media management
- Light and dark theme support

## Tech Stack

- React 18
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Firebase Storage
- React Icons

## Requirements

- Node.js
- npm
- Access to the MediaHub backend API

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/nihalvdev/mediahub.git
   cd mediahub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Backend and Storage

The frontend communicates with a MediaHub backend through `/api/v1` endpoints. Make sure the backend is running and that the local development server or deployment is configured to route API requests correctly.

Firebase Storage is used for uploaded media files and thumbnails. The Firebase configuration is currently defined in `src/firebase.js`.

## Notes

This repository contains the frontend application. The backend API must be configured separately.
