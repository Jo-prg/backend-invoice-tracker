# Invoice Tracker Backend

A Node.js backend for an invoice generator app. Features:
- User authentication (login/logout, change username/password/profile pic)
- CRUD for invoices (with pagination)
- CRUD for customers (with total invoiced, details, and related invoices)
- PostgreSQL database

## Tech Stack
- Node.js
- Express
- Sequelize (PostgreSQL)
- JWT for authentication

## Setup
1. Install dependencies: `npm install`
2. Configure PostgreSQL connection in `.env`
3. Start server: `npm start`

## Endpoints
- `/auth` - login/logout, user settings
- `/invoices` - CRUD, dashboard, pagination
- `/customers` - CRUD, details, invoices

## Notes
- Replace placeholder secrets and DB credentials in `.env`.
- Profile pics are stored as URLs or file paths.
