# StableSpots 🗺️

StableSpots is a platform that helps users **discover businesses that accept USDC (and other stablecoins)** around the world.  
Think of it as the **Google Maps for Stablecoin Commerce** – making it easy to **hold, spend, and locate businesses** where you can pay with USDC and other digital dollars.

---

## 🌍 Project Overview

- **Problem**: Stablecoins like USDC are easy to hold, but **hard to spend**. Many users don’t know where they can use them in real life.  
- **Solution**: A **live business map** with community-powered submissions. Businesses can register, and users can discover nearby places that accept USDC or other stablecoins.  
- **Vision**: Bridge crypto to everyday commerce by making stablecoins **spendable everywhere**.

---

## ⚙️ Tech Stack

### Frontend
- **Next.js / React**
- **TypeScript**
- **Tailwindcss & Shadcn** for styling
- **Axios** for API calls
- **Google Maps** (for rendering business locations)
- **Formik + Yup** for forms
- **Lucide Icons** for UI icons

### Backend
- **Node.js / Express**
- **MongoDB / Mongoose** for database
- **JWT Authentication** (for login & auth)
- **REST API** for CRUD operations
- **CORS** enabled for frontend–backend communication

---

## 📂 Project Structure

```bash
StableSpots/
├── backend/            # Node.js + Express API
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes (business, users)
│   ├── controllers/    # Business logic
│   └── server.ts       # Entry point
│   └── db.ts           # DB + environment setup
│
├── frontend/           # Next.js app
│   ├── components/     # Reusable React components
│   ├── assets/         # images, icons and custom svg icons
│   ├── pages/          # Next.js pages (Home, Add Business, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # types, mockdata
│   └── utils/          # API calls, helpers
│
├── README.md           # Documentation
└── package.json


---

## 🚀 Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

### 3. Run the Server
```bash
npm run dev 
```
or use this
```bash
npx ts-node src/server.ts
```
Server runs on: **http://localhost:5000**

---

## 💻 Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables
Create a `.env.local` file inside `frontend/`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run the App
```bash
npm run dev
```
Frontend runs on: **http://localhost:3000**

---

## 🔑 Features

- 🌐 **Business Discovery** – Find places that accept USDC & other stablecoins  
- 📝 **Add a Business** – Businesses can register with:
  - Name, Address, Country, City
  - Do you accept USDC? (Yes/No)
  - Stablecoins accepted (USDC, USDT, DAI, etc.)
- 🔍 **Search & Filter** – Locate businesses by country, city, or token accepted  
- 👤 **User Authentication** – Login / Register with JWT  
- 📊 **Admin Dashboard** (future) – Manage listings and approval  

---

## 📌 API Endpoints

### Business Routes
```http
POST   /api/businesses      # Add new business
GET    /api/businesses      # Get all businesses
GET    /api/businesses/:id  # Get single business
PUT    /api/businesses/:id  # Update business
GET /api/businesses/search  # Get businesses with filters, search, recommended, sort
```

### User Routes
```http
POST   /api/admin/login      # Login Admin User
```

---

## 🛠️ Future Improvements

- ✅ Add rating & reviews for businesses  
- ✅ Add wallet connect (onchain proof that they accept USDC)  
- ✅ Gamify submissions (badges, points for adding businesses)  
- ✅ Mobile-first UI with offline support  

---

---
## 🤝 Architecture Guide

Please read our [ARCHITECTURE.md](ARCHITECTURE.md) for details how `StableSpots` is built.
---

## 🤝 Contribution Guide

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.
---

## 📄 License
MIT License © 2025 StableSpots Team