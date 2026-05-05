# WebSocket Real-Time Messaging Platform

A modern, full-stack social messaging application with real-time communication, user authentication, and interest-based connections. Built with React, Express.js, and WebSocket technology.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **User Authentication**: Secure sign-up and sign-in with JWT tokens and bcrypt password hashing
- **Real-Time Messaging**: Instant messaging powered by WebSocket (Socket.io) with live connection status
- **User Profiles**: Create and customize user profiles with profile pictures
- **Posts/Feed**: Share posts with the community and interact with others
- **User Search**: Find and connect with other users
- **Interest Matching**: Connect with users based on shared interests
- **Dashboard**: Personalized dashboard showing your connections and activity
- **Image Uploads**: Upload profile pictures and media via Cloudinary integration

## 🛠 Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **React Router DOM** 7.6.0 - Client-side routing
- **Recoil** 0.7.7 - State management
- **Socket.io Client** 4.8.1 - Real-time communication
- **Axios** 1.14.0 - HTTP client
- **Tailwind CSS** - Styling and utility-first CSS
- **Framer Motion** 12.23.12 - Animation library
- **Lucide React** & **React Icons** - Icon libraries
- **HeroIcons** - Additional icon library

### Backend
- **Express.js** 5.1.0 - Web framework
- **Node.js** - Runtime environment
- **Socket.io** 4.8.1 - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** 8.15.0 - MongoDB object modeling
- **JWT** 9.0.2 - Authentication tokens
- **Bcrypt** 6.0.0 - Password hashing
- **Multer** 2.1.1 - File upload handling
- **Cloudinary** 2.9.0 - Cloud image storage
- **CORS** - Cross-origin resource sharing
- **Dotenv** 16.5.0 - Environment variable management

## 📁 Project Structure

```
websocket/
├── client/                          # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── Components/              # Reusable components
│   │   │   ├── Button.js
│   │   │   ├── Whatnew.js
│   │   │   └── config.js           # Configuration constants
│   │   ├── modules/                # Feature modules
│   │   │   ├── Dashboard/          # Dashboard module
│   │   │   ├── Elements/           # UI elements
│   │   │   │   ├── Connection.js
│   │   │   │   ├── Header.js
│   │   │   │   ├── Messanging.js   # Messaging module
│   │   │   │   ├── Post.js
│   │   │   │   └── Searching.js
│   │   │   ├── form/               # Form components
│   │   │   └── input/              # Input components
│   │   ├── Pages/                  # Page components
│   │   │   ├── AppLanding/         # Landing page
│   │   │   └── Landing/            # Landing layout
│   │   ├── store/                  # Recoil state management
│   │   │   └── atoms/
│   │   ├── utils/                  # Utility functions
│   │   │   ├── sendMessage.js
│   │   │   └── fetchMessage.js
│   │   ├── App.js                  # Main app component
│   │   └── index.js                # Entry point
│   └── package.json
│
├── server/                          # Express Backend
│   ├── app.js                       # Main server file
│   ├── db/
│   │   └── connection.js            # MongoDB connection
│   ├── models/                      # Mongoose schemas
│   │   ├── User.js
│   │   ├── Conversation.js
│   │   ├── Messages.js
│   │   └── Post.js
│   ├── Routing/
│   │   └── auth.js                 # Authentication routes
│   ├── post/                        # Post-related handlers
│   │   ├── index.js
│   │   └── UserPost.js
│   ├── uploads/                     # Uploaded files
│   └── package.json
│
└── .gitignore                       # Git ignore rules
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn** (package managers)
- **MongoDB** (local or cloud instance - MongoDB Atlas recommended)
- **Git** (for version control)

### Optional
- **Cloudinary Account** (for image uploads) - [Get started here](https://cloudinary.com/)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/websocket.git
cd websocket
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

## 🔐 Environment Setup

### Backend Environment Variables
Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/websocket

# Cloudinary Configuration
CLOUDINARY_API_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret
JWT_SECRET=your_secret_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Frontend Configuration
Update `src/Components/config.js` with your backend URL:

```javascript
export const BACKEND_URL = 'http://localhost:5000';
```

## ▶️ Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run scripts
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd client
npm start
```

The frontend will open at `http://localhost:3000` and the backend runs on `http://localhost:5000`.

### Option 2: Run with Build (Production)

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Backend:**
```bash
cd server
npm run scripts
```

## 📡 API Routes

### Authentication Routes
- `POST /auth/sign_up` - Register a new user
- `POST /auth/sign_in` - Login user
- `POST /auth/logout` - Logout user

### User Routes
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `GET /users/search/:query` - Search users

### Messaging Routes
- `GET /messages/:conversationId` - Fetch conversation messages
- `POST /messages` - Send message (Socket.io)
- `GET /conversations` - Fetch user conversations

### Post Routes
- `GET /posts` - Fetch all posts
- `POST /posts` - Create new post
- `DELETE /posts/:id` - Delete post

### WebSocket Events
- `connect` - User connects
- `disconnect` - User disconnects
- `sendMessage` - Send real-time message
- `receiveMessage` - Receive real-time message
- `userOnline` - User comes online
- `userOffline` - User goes offline

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Authentication**: Token-based user authentication
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Sensitive data stored securely in .env

## 📱 Features Walkthrough

### 1. **Authentication Flow**
- New users sign up with email, password, full name, and interests
- Passwords are hashed using bcrypt before storage
- JWT tokens issued upon successful login for session management

### 2. **Real-Time Messaging**
- Uses Socket.io for bidirectional communication
- Messages are persisted in MongoDB
- Displays online/offline status of users
- Automatic reconnection handling

### 3. **User Discovery**
- Search functionality to find users by name or interests
- Filter users by common interests
- View user profiles with their posts and information

### 4. **Posts & Feed**
- Users can create and share posts
- Posts displayed in a feed format
- Community interaction features

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in server's .env or
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process  # Windows
```

### MongoDB Connection Issues
- Verify MongoDB service is running
- Check connection string in `.env`
- Ensure IP whitelist in MongoDB Atlas (if using cloud)

### Socket.io Connection Failures
- Ensure backend is running
- Check CORS configuration matches frontend URL
- Verify firewall settings allow WebSocket connections

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 📧 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Last Updated**: May 2026  
**Version**: 1.0.0  
**Status**: Active Development
