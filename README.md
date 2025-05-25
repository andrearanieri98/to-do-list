# To-Do List Web App

A responsive To-Do List application built with **React** and **Firebase**. It supports user authentication, task management, dark/light mode toggle and live filtering.

## Features

- Create, edit, and delete tasks
- Assign due dates to tasks
- Filter tasks by status or search term
- Toggle between light and dark themes
- User authentication with Firebase
- Persistent login session via Firebase Auth
- Responsive design for mobile and desktop

## Tech Stack

- Frontend: React, Bootstrap
- Backend: Firebase Authentication
- State Management: useState, useEffect
- Routing: React Router DOM

## Setup & Deployment

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project and register a **Web App**
3. Copy the Firebase config object
4. Replace the placeholder config in your `firebase.js` (or wherever Firebase is initialized) with your own:

```js
// firebase.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

### 4. Start the Development Server

```bash
npm start
```

---

### 5. Build and Deploy

To build the app for production:

```bash
npm run build
```

To deploy to Firebase Hosting:

```bash
firebase login
firebase init
firebase deploy
```

> **Make sure your `firebase.json` is configured to use the `build` folder as the public directory:**

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

---

## Folder Structure

```
src/
│
├── components/
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   └── ...
│   ├── Login.jsx
│   └── Register.jsx
│
├── firebase.js
├── App.jsx
└── index.js
```
