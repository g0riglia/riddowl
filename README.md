# 🦉 Riddowl

**Riddowl** is a riddle-based web app powered by **AI-generated riddles** that change every time you play.  
Each riddle is revealed **progressively in four parts**, creating suspense with smooth transitions.  
Players are tracked in a personal **dashboard** where you can manage participants, assign victories, and save changes linked to your account.

---

## 🔗 Live Demo

👉 [Try Riddowl on Netlify](https://riddowl.netlify.app)

---

## ✨ Features

- 🧠 **AI-generated riddles** – different every time
- 🎯 **Progressive reveal** – 4-line riddles shown one by one
- 🔐 **Authentication** – create and log in to your own account
- 🧑‍💻 **Custom dashboard** per user:
  - Add, edit, and remove participants
  - Assign wins and track scores
  - Save or discard changes
  - Data is linked to your account and persists
- 📦 All data is stored securely in **Firebase Firestore**

---

## ⚙️ Tech Stack

- **React** (built with Create React App)
- **Firebase** (Authentication + Firestore)
- **Netlify** for deployment
- **Plain CSS** for styling
- **Environment Variables** to protect API keys

---

## 📦 Local Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/g0riglia/riddowl.git
cd riddowl
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Create a `.env` file

In the root directory, create a `.env` file and add your Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

> 🔒 Do not share this file publicly or push it to GitHub. It is ignored by `.gitignore`.

### 4. Run the development server

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🙌 Credits

Created by **g0riglia**  
All riddles, design, and logic are original.

---

## 📜 License

This project is licensed under the **MIT License**.
