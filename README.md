# 🛠️ ToolBox Suite

**ToolBox Suite** is a modern, privacy-focused, all-in-one digital workspace designed for **Coders**, **Writers**, and **Office Workers**. 

It combines essential utility tools (Regex testers, Diff checkers, Pomodoro timers) with cutting-edge **Google Gemini AI** integration to automate complex tasks like code debugging, content generation, and data analysis.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-sky)
![Gemini](https://img.shields.io/badge/AI-Gemini%20Pro-purple)

---

## ✨ Features

### 🤖 Global AI Assistant
*   **Chatbot:** Persistent floating assistant using **Gemini 3 Pro**.
*   **Vision:** Upload images for analysis (screenshots, diagrams, documents).

### 👨‍💻 Coder Tools
*   **AI Code Lab:** Uses **Thinking Mode** (high token budget) for deep debugging and optimization.
*   **Utilities:** Carbon-style code-to-image, Regex Tester (w/ AI explain), JSON Formatter, Diff Checker, Hash Generator.

### ✍️ Writer Tools
*   **Content Studio:** Generate articles or switch tones (Professional, Casual, etc.) using fast AI models.
*   **Zen Mode:** Distraction-free full-screen writing.
*   **Stats:** Real-time word count, reading time, and readability analysis.

### 💼 Office Tools
*   **AI Office Helper:** Smart Search (Google Grounding), Email Writer, Summarizer, Excel Formula Gen.
*   **Productivity:** Task Manager (Local Storage), Pomodoro Timer, Image Compressor, CSV-to-Chart Generator.

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   A Google Gemini API Key (Get it from [Google AI Studio](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/toolbox-suite.git
    cd toolbox-suite
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory:
    ```env
    # Required for AI features
    API_KEY=your_google_gemini_api_key_here
    ```

    > **Note:** In the web-based demo version provided, the API key is injected via the environment. For local development, ensure you use `react-scripts` or `vite` which supports `.env` variables.

4.  **Run Local Server**
    ```bash
    npm start
    ```

---

## 🏗️ Folder Structure

```
/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── tools/     # Individual tool logic (organized by category)
│   │   ├── GlobalChat.tsx
│   │   └── Sidebar.tsx
│   ├── contexts/      # Global state (ThemeContext)
│   ├── pages/         # Main dashboard views
│   ├── services/      # Gemini AI API integration
│   ├── types.ts       # TypeScript interfaces
│   ├── App.tsx        # Routing
│   └── index.tsx      # Entry point
└── README.md
```

---

## 🌍 Deployment

This app is built as a **Static Single Page Application (SPA)**. It can be deployed to any static host.

### Netlify / Vercel

1.  Push your code to GitHub.
2.  Import the project into Netlify or Vercel.
3.  **Build Settings:**
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `build` (or `dist`)
4.  **Environment Variables:**
    *   Add `API_KEY` in the deployment settings dashboard.

### GitHub Pages

1.  Add `"homepage": "https://yourname.github.io/toolbox-suite"` to `package.json`.
2.  Run `npm install gh-pages --save-dev`.
3.  Add `"deploy": "gh-pages -d build"` to scripts.
4.  Run `npm run deploy`.

---

## 🎨 Customization

*   **Theme:** The app supports Light, Dark, and System themes. Edit `tailwind.config.js` to customize colors.
*   **Adding Tools:** Create a new component in `src/components/tools/[category]/`, then register it in the corresponding `pages/[Category]Tools.tsx` file.

---

## 🛡️ Privacy Note

This application runs primarily on the client side.
*   **Local Tools:** Task Manager, Image Compressor, and stats run entirely in your browser.
*   **AI Features:** Data sent to Google Gemini API is subject to Google's [AI Data Policy](https://ai.google.dev/terms).
