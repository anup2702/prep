# ResumeFlow — Resume Analysis Prototype

A working prototype for resume analysis with home page, mock authentication, and analysis features.

## Run the app

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Flow

1. **Home** (`/`) — Landing page with hero, feature preview, and nav links
2. **Auth** — Log in or Sign up (no real database; any email/password works, stored in `localStorage`)
3. **Dashboard** (`/dashboard`) — Protected route with Analyze and History tabs

## Features

- **Create Resume** — Build a resume with Modern, Classic, or Minimal templates. Fill contact, experience, education, skills. Download as HTML (print to PDF).
- **Demo Pricing** — Free, Pro ($14/mo), Enterprise plans with feature lists.
- **Resume upload** — Upload PDF or DOCX for analysis
- **Job description matching** — Paste a job description to get a match score
- **Extracted keywords** — Mock display of detected skills
- **Export report** — Download analysis as a `.txt` file
- **History** — Past analyses saved in `localStorage` (per user)
- **Theme toggle** — Light/dark mode (persisted)
- **Dashboard tabs** — Switch between Analyze and History

## Structure

```
src/
├── context/
│   ├── AuthContext.jsx   # Mock auth (localStorage)
│   ├── HistoryContext.jsx # Analysis history per user
│   └── ThemeContext.jsx   # Light/dark theme
├── components/
│   ├── ProtectedRoute.jsx
│   └── ThemeToggle.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── DashboardPage.jsx
├── utils/
│   └── mockAnalysis.js
├── App.jsx
└── main.jsx
```
