# 🧠 Inventory Management Backend

This is the backend for an inventory and asset tracking system. It’s built to be **fair**, **auditable**, and **user-friendly** — with clear roles, secure data handling, and a clean API structure.

---

## 🏗️ Architecture Overview

This backend is built using:

- **Node.js + Express**: Handles HTTP requests and routes.
- **MongoDB**: Stores all inventory data in a flexible, document-based format.
- **Mongoose**: Makes it easier to define schemas and interact with MongoDB.
- **JWT Authentication**: Secures routes and identifies users.
- **Role-Based Access Control**: Different users (admin, staff, etc.) see and do different things.
- **Transaction Logging**: Every inventory action is tracked for auditability.
- **Validation & Feedback**: Ensures clean data and gives clear responses to the frontend.

---

## 📦 Features

- Add, transfer, and track inventory items
- Assign assets to users with date validation
- Notification logic for frontend badges
- Filterable transaction history with user roles

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Gokulnithi/InventoryBackend
cd inventory-backend
