# E-Connect — E-Commerce Application

A learning-ready full-stack e-commerce starter with a React storefront and Express API. It includes product browsing, category filtering, search, cart management, and a demo checkout. It does **not** process real payments or ship orders.

## Stack
- Frontend: React, Vite, HTML, CSS, JavaScript
- Backend: Node.js, Express
- Data: MongoDB with Mongoose (falls back to sample in-memory products if MongoDB is not configured)

## Run locally
1. Install Node.js 18+ and (optionally) MongoDB.
2. In `server/`, run `npm install`, copy `.env.example` to `.env`, then run `npm run dev`.
3. In a second terminal, in `client/`, run `npm install` then `npm run dev`.
4. Open the Vite URL shown in the terminal (normally http://localhost:5173).

The API runs on http://localhost:5000. If `MONGODB_URI` is absent, the API uses sample products in memory; changes will not persist after restart.

## Demo checkout
Checkout creates a demo order response only. No payment gateway, customer account, email, shipping, or production security is configured.

## Before publishing
Set real project details, add screenshots, test all flows, and never commit `.env` or secrets. Do not claim production payment processing.
