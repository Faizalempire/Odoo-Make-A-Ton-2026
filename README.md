# Odoo-Make-A-Ton-2026
# Subscription Management System

A full-stack subscription management platform developed for **Odoo Make-A-Ton 2026**. The application is designed to help businesses manage customers, products, subscription plans, quotations, billing operations and payments through a centralised system.

## Project Overview

The Subscription Management System aims to simplify subscription-based business operations by bringing customer management, subscription administration and billing workflows into one platform.

The project follows a modular architecture, with a React-based frontend and an Express.js backend supported by MongoDB.

## Key Features

### User Authentication & Access Control
- User registration and login.
- JWT-based authentication.
- Role-based access control.
- Protected API endpoints.

### Customer Management
- Create and manage customer records.
- Retrieve customer information.
- Update customer details.
- Soft-delete customer records.

### Product & Subscription Management
- Product management.
- Subscription plan management.
- Subscription data models.
- Subscription-related business workflows.

### Billing & Financial Management
- Invoice management.
- Payment management.
- Tax and discount models.
- Billing calculations.
- Billing-period utilities.

### Dashboard
- React-based dashboard interface.
- Structured frontend components.
- Centralised access to application sections.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcrypt |
| API | REST API |
| Version Control | Git, GitHub |

## Project Structure

```text
Odoo-Make-A-Ton-2026/
│
├── client/
│   └── Frontend application
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── tests/
│   ├── utils/
│   └── server.js
│
├── docs/
│
├── .gitignore
└── README.md
```

*The directory structure may evolve as development continues.*

## Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Faizalempire/Odoo-Make-A-Ton-2026.git
```

### 2. Navigate to the Project

```bash
cd Odoo-Make-A-Ton-2026
```

### 3. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory and configure the required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Use your own credentials. Never commit the `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

If the project does not define a development script, use its configured start script.

### 4. Set Up the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Vite will display the local development URL in the terminal.

## API Overview

The backend exposes REST API endpoints for the application's main modules.

| Module | Purpose |
|---|---|
| Authentication | Registration, login and current-user details |
| Customers | Customer CRUD operations |
| Products | Product management |
| Plans | Subscription plan management |
| Subscriptions | Subscription operations |
| Quotations | Quotation management |
| Invoices | Invoice management |
| Payments | Payment operations |
| Taxes | Tax management |
| Discounts | Discount management |

API routes are organised under the backend's `routes` directory.

## Team

Developed by a three-member team for **Odoo Make-A-Ton 2026**.

| Team Member | Responsibility |
|---|---|
| Faizal S | Team Lead — Backend Development |
| Saran Nath | Frontend Development |
| Sivaprasad S S | Billing and Financial Modules |

## Version Control

The project uses Git for version control and GitHub for collaboration.

- `main` — Integrated project branch.
- `feature/faizal-backend` — Backend development.
- `feature/saran-frontend` — Frontend development.
- `feature/sivaprasad-billing` — Billing development.

All three contributors' work has been integrated into the `main` branch.

## Project Status

**Development:** Hackathon project — Odoo Make-A-Ton 2026.

The repository brings together the frontend, backend and billing modules. Further integration, testing and refinement may continue as development progresses.

---

**Built collaboratively for Odoo Make-A-Ton 2026.**