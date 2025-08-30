
# 🏗️ Architecture Overview

This document provides a detailed view of the architecture for **StableSpots**, covering both backend and frontend components, database, and future blockchain integration support.

---

## 🔹 System Overview

StableSpots is designed as a **full-stack web application** with the following components:

- **Frontend**: React + Next.js for UI and user interaction  
- **Backend**: Node.js with Express for API and business logic  
- **Database**: MongoDB for business and user data persistence  
- **Future Support**: Blockchain integration to enable stablecoin payments and verification  

---

## 🖥️ Frontend (React + Next.js)

- Built using **React** and **Next.js**
- Handles all user-facing interactions (sign-up, login, business onboarding, browsing businesses, etc.)
- Uses API calls to communicate with the backend
- Components include:
  - **Business Form** – Collects user/business info
  - **Business Listing** – Displays available businesses accepting stablecoins
  - **UI/UX Enhancements** – Uses Tailwind css for styling and responsiveness

---

## ⚙️ Backend (Node.js + Express)

- Provides a RESTful API for the frontend
- Handles business logic and communication with the database
<!-- - Implements authentication and validation for users and businesses -->
- Implements authentication for admin to approve businesses wanting to list their business on stablespots.
- Future-ready for blockchain-related API endpoints (stablecoin acceptance, on-chain verification, etc.)

**Key Endpoints:**

#### Business Routes

- `GET /api/businesses` → Fetch all approved businesses (shown on public map).
- `GET /api/businesses/search?search=&category=&sort=&lat=&lng=` → Search/filter businesses, search → text search (name, description), category → filter by category, sort=recent → newest first, sort=nearby&lat=&lng= → sort by distance (client-side)  
- `GET /api/businesses/pending` (admin only) → Fetch pending businesses for review.
- `POST /api/businesses` → Submit new business (defaults to pending status). 
- `PATCH /api/businesses/:id` (admin only) → Approve or reject a business (status = "approved" | "rejected").

#### Admin Routes

- `POST /api/admin/login` → Admin login with password. Returns JWT token (valid 6h).
- `Middleware: requireAdmin` → Protects admin-only routes (checks for valid admin JWT).
---

## 🗄️ Database (MongoDB)

MongoDB stores business and  information. Collections include:

- **Business Collection**
- Stores all registered businesses along with their status and other relevant details.
  ```json
  {
  "name": "Crypto Cafe",
  "category": "Cafe",
  "lat": 40.7128,
  "lng": -74.0060,
  "walletAddress": "0x1234...abcd",
  "website": "https://cryptocafe.com",
  "acceptsUSDC": true,
  "description": "A cafe that accepts cryptocurrency payments.",
  "contactEmail": "contact@cryptocafe.com",
  "status": "approved",
  "createdAt": "2025-08-30T00:00:00Z",
  "updatedAt": "2025-08-30T12:00:00Z"
  }
  ```

---

## 🔗 Blockchain Integration (Future)

StableSpots is designed to support blockchain functionality in the future:

- Businesses can **verify stablecoin acceptance on-chain**
- Payment tracking with **USDC, DAI, and other stablecoins**
- Smart contract interaction to validate business trustworthiness

---

## 📊 High-Level Architecture Diagram

```plaintext
                ┌─────────────────┐
                │   Frontend UI   │
                │ (React/Next.js) │
                └───────▲─────────┘
                        │ API Calls (REST)
                        ▼
                ┌──────────────────┐
                │    Backend API   │
                │ (Node.js Express)│
                └───────▲──────────┘
                        │ Database Queries
                        ▼
                ┌──────────────────┐
                │     MongoDB      │
                │ (Data Storage)   │
                └──────────────────┘
                        │ Future
                        ▼
                ┌──────────────────┐
                │  Blockchain Layer │
                │ (Stablecoin Pay) │
                └──────────────────┘
```

---

## 🚀 Future Enhancements

- On-chain verification for businesses  
- Stablecoin payment tracking  
- Crowdsourced updates for business stablecoin adoption  
- Mobile-first app with offline mode  

---

## 📌 Summary

The architecture ensures scalability, security, and extensibility:  
- **MongoDB** → scalable NoSQL storage  
- **Node.js + Express** → lightweight and efficient backend  
- **React + Next.js** → modern, fast frontend  
- **Blockchain Layer (future)** → decentralized verification and payments  
