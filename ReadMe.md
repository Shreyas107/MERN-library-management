# 📚 Library Management System (MERN)

A full-stack **Library Management System** built using the **MERN stack** (MongoDB, Express, React, Node.js).
This project enables seamless management of books, users, and library operations with **role-based access**, making it suitable for schools, colleges, and organizations.

---

## 🚀 Features

### 🔐 **Authentication & Authorization**

- Secure login & registration
- Role-based access: **Admin**, **Librarian**, **Member**
- JWT-based authentication

### 🧑‍💼 **Admin Features**

- Manage users (create/update/delete)
- Assign roles
- Manage entire book inventory

### 📚 **Librarian Features**

- Add, update, and delete books
- Issue books to members
- Accept returned books
- Track overdue books and fines

### 👤 **Member Features**

- Browse all books
- Borrow / request books
- View issued books
- Track due dates and fines

### 🗃️ **Book Management**

- Add & maintain book catalog
- Category-wise sorting
- Search and filter functionality

### 📅 **Issue/Return Management**

- Issue books with due dates
- Return tracking
- Fine calculation for overdue books

---

## 🛠️ Tech Stack

### **Frontend**

- React
- React Router
- Redux Toolkit
- Bootstrap

### **Backend**

- Node.js
- Express.js
- MongoDB (with Mongoose)

### **Database**

- MongoDB Atlas / Local MongoDB

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Shreyas107/MERN-library-management.git
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd web-frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside `/backend`:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_random_secret_key
PORT=4545
```

---

## 📌 Available User Roles

| Role          | Capabilities                           |
| ------------- | -------------------------------------- |
| **Admin**     | Manage users, roles, books             |
| **Librarian** | Issue/return books, manage books       |
| **Member**    | Browse/borrow books, view issued books |

---
