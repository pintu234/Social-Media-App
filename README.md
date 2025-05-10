# 📸 Fullstack Image Sharing App

A complete MERN-stack image sharing web application where users can register, log in, upload images with captions, and view all uploaded posts.

## 🔧 Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer
- **Storage**: Local `uploads/` folder
- **Styling**: CSS

---

## ✅ Features

- 🔐 **User Authentication**: Register/Login using JWT tokens.
- 📤 **Image Uploads**: Users can upload images with captions.
- 🖼️ **Post Feed**: All uploaded images are visible to all users.
- 📁 **Multer Integration**: Handles image uploads and saves files in the `uploads/` directory.
- 🌐 **RESTful API**: Well-structured API endpoints.

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/image-sharing-app.git
cd image-sharing-app
2. Install backend dependencies
bash
Copy
Edit
cd server
npm install
3. Set up MongoDB
Make sure MongoDB is running and accessible locally or use MongoDB Atlas. Add your MongoDB URI to .env:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4. Start the backend server
bash
Copy
Edit
npm start
5. Install frontend dependencies
Open a new terminal:

bash
Copy
Edit
cd client
npm install
6. Start the frontend server
bash
Copy
Edit
npm start
🛣️ API Routes
POST /api/auth/register
Registers a new user
Body: { username, email, password }

POST /api/auth/login
Logs in a user
Body: { email, password }
Returns: { token }

POST /api/posts
Create a new post (image + caption)
Header: Authorization: Bearer <token>
FormData: image, caption

GET /api/posts
Fetch all posts (caption + image URL)

📂 Folder Structure
bash
Copy
Edit
/client     → React frontend
/server     → Express backend
/uploads    → Uploaded image files
🖼️ Example Post JSON
json
Copy
Edit
{
  "caption": "My first post!",
  "imageUrl": "http://localhost:5000/uploads/1746876975462-piyush_profile.jpeg"
}
📜 License
This project is for educational/demo purposes. Feel free to modify and use it as needed.

🙌 Acknowledgements
Thanks to Node.js, React, MongoDB, Multer, and JWT for making this app possible!
