# Next-Gen Learning Dashboard

A modern Learning Dashboard built using **Next.js**, **Supabase**, **Tailwind CSS**, and **Framer Motion**. The application enables users to manage courses, track progress, view analytics, and interact with a responsive dashboard powered by real database data.

## Live Demo

**Deployment:** https://learning-dashboard-silk.vercel.app/

**GitHub Repository:** https://github.com/Anushka-source/learning-dashboard.git

---

## Features

* Responsive Dashboard UI
* Glassmorphism Design System
* Course CRUD Operations (Create, Read, Update, Delete)
* Real-Time Analytics from Supabase Data
* Course Progress Tracking
* Activity Visualization Grid
* Loading Skeleton Screens
* Framer Motion Animations
* Mobile Responsive Navigation
* TypeScript Support
* Supabase Integration

---

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend & Database

* Supabase
* PostgreSQL

### Deployment

* Vercel

---

## Project Structure

```text
learning-dashboard/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── globals.css
│
├── components/
│   ├── dashboard/
│   │   ├── HeroTile.tsx
│   │   ├── CourseCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AnalyticsView.tsx
│   │   ├── SettingsView.tsx
│   │   └── ActivityTile.tsx
│   │
│   └── theme/
│       ├── ThemeProvider.tsx
│       └── ThemeSwitcher.tsx
│
├── lib/
│   └── supabase.ts
│
├── types/
│   └── course.ts
│
├── public/
│
├── .env.example
├── README.md
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Architecture

### Next.js App Router

The application uses the Next.js App Router for layouts, loading states, routing, and server-side data fetching.

Benefits:

* Better performance
* Improved scalability
* Cleaner project organization
* Built-in loading states

### Supabase Integration

Supabase serves as the backend database.

Stored course information includes:

* Course Title
* Progress Percentage
* Icon Name
* Creation Date

All dashboard data is fetched dynamically from Supabase.

---

## Server and Client Component Split

### Server Components

Used for:

* Fetching course data from Supabase
* Initial page rendering
* Reducing client-side JavaScript

Benefits:

* Faster loading
* Better performance
* Secure data access

### Client Components

Used for:

* Sidebar navigation
* CRUD interactions
* Analytics visualizations
* Theme selection
* Notification toggles
* Framer Motion animations

Benefits:

* Interactive user experience
* Smooth state management
* Responsive UI behavior

---

## Analytics Implementation

Analytics are calculated dynamically using Supabase course data.

Metrics include:

* Total Courses
* Average Progress
* Completed Courses
* In Progress Courses
* Highest Progress Course
* Lowest Progress Course

These values automatically update whenever course data changes.

---

## CRUD Functionality

### Create

Users can add new courses through the dashboard interface.

### Read

Courses are fetched directly from Supabase and displayed dynamically.

### Update

Course details and progress values can be edited.

### Delete

Courses can be removed from both the dashboard and database.

---

## Design Decisions

The dashboard follows a Glassmorphism-inspired design system featuring:

* Soft gradients
* Glass-style cards
* Rounded corners
* Subtle shadows
* Responsive Bento-style layout

Color Palette:

* Pink
* Purple
* Sky Blue
* White

The objective was to create a clean and modern learning experience while maintaining readability and accessibility.

---

## Performance Optimizations

### Loading Skeletons

A dedicated `loading.tsx` file provides loading placeholders while data is being fetched.

### Framer Motion

Animations rely on:

* Opacity
* Translate
* Scale

This minimizes layout shifts and improves rendering performance.

### Type Safety

TypeScript interfaces ensure consistency between Supabase data and UI components.

---

## Challenges Faced

During development, several challenges were encountered:

* Integrating Supabase with Next.js App Router
* Managing Server and Client Component boundaries
* Preventing hydration mismatches
* Building reusable dashboard components
* Creating a responsive Bento-style layout
* Implementing CRUD operations safely
* Maintaining consistent glassmorphism styling across all views

These challenges were addressed through component modularization, TypeScript, and Next.js best practices.

---

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

A sample configuration is provided in `.env.example`.

---

## Installation

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Build the application:

```bash
npm run build
```

Run production mode:

```bash
npm start
```

---

## Deployment

The application is deployed using Vercel.

Deployment Steps:

1. Push code to GitHub
2. Import repository into Vercel
3. Add Supabase environment variables
4. Deploy

---

## Future Improvements

* User Authentication
* Course Search & Filtering
* Progress History Tracking
* Advanced Charts & Visualizations
* Email Notifications
* Goal Tracking
* Persistent Theme Preferences

---

## Author

**Anushka Shukla**

GitHub: https://github.com/Anushka-source

Built using Next.js, Supabase, Tailwind CSS, and modern frontend development practices.
