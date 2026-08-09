# 🧠 HabitForge (Backend)

📌 This is the backend server for **HabitForge**, a habit-tracking and productivity web application.  
Built with **Node.js, Express, MongoDB**, and supports authentication, user management, OTP verification, and profile updates.

---

## 🚀 Features

✔ User Authentication (Login / Signup)  
✔ OTP-based Forgot Password  
✔ Password Reset  
✔ User Profile Management  
✔ Avatar Upload (Cloudinary)  
✔ Session Handling  
✔ Secure Password Hashing (bcrypt)  
✔ Clean REST API  
✔ Error Handling and Validation

---

## 🛠 Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – API server
- **MongoDB + Mongoose** – Database + ORM
- **bcrypt** – Password hashing
- **JWT / Sessions** – Authentication (if used)
- **Cloudinary** – Image storage
- **dotenv** – Environment config
- **nodemon** – Development

---
## 🔧 Installation

### 1️⃣ Clone the repo

```bash
git clone https://github.com/sushankannahd17/habitforge-backend.git
```

2️⃣ Install dependencies
```bash
cd habitforge-backend
npm install
```

3️⃣ Create .env
Create a .env file in project root:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret
```
4️⃣ Run the server
npm run dev

---
🧑‍💻 Contributing

Fork it

Clone locally

Create feature branch

Commit

Push & submit PR

---
📜 License

This project is licensed under the MIT License.

---
❤️ Credits

Built with ❤️ by Sushan Kannah D

Helping people form better habits every day 🚀