# 💼 Job Application Tracker

Job Application Tracker is a modern, full-stack Kanban board application designed for tracking job hunt progress. 
It allows users to manage their job applications across custom columns using drag-and-drop mechanics, filter data efficiently, look up transition history, and receive instant email updates upon status changes.

<br>

## 🔗 Live Preview
  👉 [View Live](https://job-application-tracker-tau-snowy.vercel.app/)

<br>

## 🛠 Technologies Used

### Core
  - Next.js 16 (App Router) — Full-stack React framework
  - React 19 — UI library
  - TypeScript — Static type safety

### UI/UX & Interactivity
  - @dnd-kit (Core / Sortable) — Drag-and-drop kanban functionality
  - Tailwind CSS v4 — Utility-first styling with dynamic theme support
  - shadcn/ui & @base-ui/react — Accessible, unstyled & fully customized UI components
  - next-themes — Seamless Light and Dark mode switching
  - Lucide React — Modern iconography

### Backend, Database & Auth
  - MongoDB & Mongoose — NoSQL database and object modeling
  - Better Auth — Secure user authentication and session management
  - Nodemailer — Transactional email notification system

<br>

## 🚀 Getting Started
To run the project locally, follow these steps:

### 1️⃣ Clone the repository
```bash
git clone [https://github.com/your-username/job-application-tracker.git](https://github.com/your-username/job-application-tracker.git)
cd job-application-tracker
```
### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Configure environment variables
Create a .env.local file in the root directory and add the following keys:
```bash
MONGODB_URI=your_mongodb_connection_string
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_16_digit_google_app_password
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### 4️⃣ Seed mock database data (Optional)
```bash
npm run seed:jobs
```

### 5️⃣ Run the project locally
```bash
npm run dev
```

<br>

## ✨ Features
  - **Interactive Kanban Board:** Drag and drop job application cards smoothly across different columns to change their status using @dnd-kit.
  - **Secure Authentication:** Complete sign-in and sign-up flows managed securely by better-auth.
  - **Dynamic Filtering & Debouncing:** Fast search bar filtering by company, position, or tags. Includes built-in debouncing to optimize re-renders.
  - **Native Date Picker:** Click-anywhere native date-picker for selecting application dates without keyboard input or accidental text selection issues.
  - **Persistent Filters via URL:** Filter parameters (search queries, tags, dates) are saved inside the URL search parameters (useSearchParams), ensuring they persist on page reload.
  - **Status History Logs:** View a comprehensive modal dialog detailing every column transition for a specific job application.
  - **Automated Email Notifications:** Real-time email alerts sent to the user via nodemailer whenever an application is moved to a new column.
  - **Theme Toggling:** Fully integrated Light and Dark modes matching system preferences or manual selections via next-themes.
  - **Full CRUD Management:** Easily add, edit, or delete job applications with real-time error handling inside modal windows.
  - **Loader:** Uses skeleton screens for a better user experience.

<br>

## 📄 License
This project is open-source and available under the MIT License.
