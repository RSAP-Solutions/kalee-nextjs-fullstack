# Admin Module

## Overview

The Admin Module provides a private area to manage content for the Kealee site. It currently implements UI-only pages with localStorage-based authentication (temporary) and will later be integrated with backend APIs.

## Routes

- `/admin` – Login page (hardcoded credentials)
- `/admin/dashboard` – Admin home with quick stats
- `/admin/gallery` – Gallery listing
- `/admin/blogs` – Blog posts listing
- `/admin/categories` – Categories listing
- `/admin/products` – Products listing

## Authentication (Temporary)

- Type: Client-side only using `localStorage`
- File: `src/utils/adminAuth.ts`
- Session key: `kealee_admin_session`
- Hardcoded credentials:
  - Username: `admin`
  - Password: `kealee@2025`
- Functions:
  - `login(username, password)`
  - `logout()`
  - `getCurrentAdmin()`
  - `isAuthenticated()`
- Event: `adminAuthChanged` – dispatched on login/logout for UI updates

## Layout

- File: `src/components/admin/AdminLayout.tsx`
- Responsibilities:
  - Sidebar navigation
  - Auth guard (redirects to `/admin` if not authenticated)
  - Logout button
  - Consistent content container styling
- Sidebar links:
  - Dashboard
  - Gallery
  - Blogs
  - Categories
  - Products

## Listing Pages

All admin listing pages use a simple table component:

- Table component: `src/components/admin/Table.tsx`
- Columns defined per page using:
  ```ts
  type Column<T> = { header: string; accessor: keyof T | (row: T) => ReactNode };
  ```
- Current pages and sample schemas:
  - Gallery: `{ id, title, status, createdAt }`
  - Blogs: `{ id, title, author, status, createdAt }`
  - Categories: `{ id, name, slug, products }`
  - Products: `{ id, title, price, category, status }`

These datasets are currently hardcoded. Replace with API results later.

## Future API Integration

Once the backend is available, update the following areas:

1. Authentication
   - Replace `src/utils/adminAuth.ts` with real auth calls
   - Endpoints (suggested):
     - `POST /api/admin/login`
     - `POST /api/admin/logout`
     - `GET /api/admin/me`
   - Store JWT/token securely (httpOnly cookies recommended)

2. Data Fetching
   - Replace static rows in admin pages with fetch calls:
     - `GET /api/admin/gallery`
     - `GET /api/admin/blogs`
     - `GET /api/admin/categories`
     - `GET /api/admin/products`
   - Add create/update/delete actions later:
     - `POST /api/admin/{entity}`
     - `PUT /api/admin/{entity}/:id`
     - `DELETE /api/admin/{entity}/:id`

3. Access Control
   - Protect admin routes server-side with middleware
   - Suggested Next.js approach: Route middleware or API route auth checks

4. Error & Loading States
   - Add spinners and toast notifications
   - Add retry and error boundaries

## Styling

- Uses existing Tailwind design tokens and components (`card`, `stat-card`, `btn-primary`, etc.)
- Sidebar is sticky on large screens
- Fully responsive

## Testing Checklist

- [ ] Login with default credentials
- [ ] Redirect to dashboard on successful login
- [ ] Direct visit to `/admin/*` redirects to `/admin` when not logged in
- [ ] Sidebar navigation works across pages
- [ ] Logout returns to `/admin` login page
- [ ] Tables render correctly on each listing page

## Notes

- The current implementation is deliberately UI-only and not secure; do not use in production without backend integration.
- Replace hardcoded credentials and localStorage session as soon as the backend is ready.
