📝 SAN React Admin Panel
A React + TypeScript + React Query admin panel project to manage posts with authentication, role-based access, localization, and responsive design.

Install

npm install
npm start

🚀 Features
✅ Authentication & Authorization

Login system (mocked API)

Role-based route protection (ProtectedRoute)

Permission checks (hasPermission utility)

✅ Posts Management

List posts with edit & delete options

Create new posts with live cache updates

Edit post with cache updates across views

Delete posts with immediate cache removal

✅ React Query Integration

Global QueryClient setup with persisted cache

invalidateQueries and setQueryData patterns

Uses TanStack React Query v4 for efficient data management

✅ Routing

React Router v6

Lazy-loaded pages with fallback loaders

Custom route loader supporting per-route translations

✅ i18n Internationalization

Configured with react-i18next

Dynamic namespace loading per route

Language switcher (EN/TR) component with active state

✅ UI & Styling

SCSS modules for component styles

Responsive navbar with hamburger menu

Mobile-first design adjustments

✅ Components

Navbar with conditional links and language switcher

Posts list page

Single post page with edit and comments tabs

Loader and error states

✅ Architecture

Modular folder structure

Separated API services under /api

Query options abstracted under /api/queries

🏗 Tech Stack
React with TypeScript

React Router v6

TanStack React Query v4

React i18next

SCSS modules

Axios

🧩 Key Design Decisions
React Query for state & server sync

staleTime configured based on page needs

Manual cache updates on create/edit/delete for optimal UX

Dynamic i18n loading

Route-based namespaces for performance

Role-based routes

hasPermission utility decouples logic from UI

👨‍💻 Author
Yunus Emre Üveyik

React & Frontend Engineer

📄 License
MIT
