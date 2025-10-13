# Search a GitHub User

A tiny React + Tailwind app that looks up public profiles from the **GitHub Users API** and renders them as clean, responsive cards.

> Type a username, hit **Search**, and get the profile: avatar, name/login, bio, company, location, and quick stats (repos, followers, following).

---

## ✨ Features

- **Fast search** by GitHub username
- **Profile card** with links to GitHub profile and personal website
- **Error handling** for user-not-found and rate limit responses
- **Accessible**: keyboard-friendly, `aria-live` updates for loading/errors
- **Responsive grid** (multiple cards; new searches appear at the top)
- **Duplicate-safe** (re-searching the same user updates the card instead of adding another)

> _Note:_ Depending on the variant you use, the project calls the API with either the native **Fetch API** or **axios**. If you use the axios version, install it: `npm i axios`.

---

## 🧰 Tech Stack

- **React** (Create React App or Vite compatible)
- **Tailwind CSS**
- **Fetch API** (or **axios** in the alternative `Form.js`)
- **Jest + React Testing Library** (sample test included)

---

## 🚀 Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Start the dev server
npm start

# 3) Run tests (optional)
npm test

# 4) Build for production
npm run build
```

The app will start on `http://localhost:3000` (CRA default).

---

## ⚙️ Configuration (Optional: Higher Rate Limits)

Unauthenticated calls to the GitHub API are limited to **~60 requests/hour per IP**.  
For heavier usage, create a **fine-grained personal access token** on GitHub and expose it to the app:

1. Create `.env` in the project root:
   ```dotenv
   REACT_APP_GITHUB_TOKEN=ghp_yourTokenHere
   ```
2. Restart the dev server.
3. In `Form.js`, include the header when calling the API:
   ```js
   const headers = {
     Accept: "application/vnd.github+json",
     ...(process.env.REACT_APP_GITHUB_TOKEN && {
       Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
     })
   };
   // pass `headers` to fetch/axios
   ```

> _Never commit real tokens._ Add `.env` to `.gitignore`.

---

## 🧭 How It Works

- `Form` handles input, validates it, then queries `https://api.github.com/users/:username`.
- On success, it calls `onSubmit(user)`.
- `App` stores users in state (new results go to the top; existing users are updated).
- `CardList` lays out results in a responsive grid.
- Each `Card` renders the profile details and helpful links.

---

## 📁 Project Structure

```
src/
├─ App.js
├─ index.js
├─ index.css
├─ App.css
└─ components/
   ├─ Form.js
   ├─ CardList.js
   └─ Card.js
```

> Your project may include additional files like `setupTests.js`, `reportWebVitals.js`, etc. (CRA defaults).

---

## 🧪 Testing

A simple test asserts that the header is rendered:

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app header", () => {
  render(<App />);
  const header = screen.getByRole("heading", { name: /Search a GitHub User/i });
  expect(header).toBeInTheDocument();
});
```

Run tests with:
```bash
npm test
```

---

## 🛠 Troubleshooting

- **User not found (404):** Double-check the username.
- **Rate limit (403):** Add a token (see _Configuration_) or wait a bit.
- **CORS / Network errors:** Ensure you’re online and `api.github.com` is reachable.
- **Tailwind styles missing:** Verify Tailwind is properly set up in `index.css` and PostCSS config.

---

## 📦 Deploy

- **Vercel / Netlify:** Deploy the repo; use the default React build command.
- **GitHub Pages:** `npm run build` then publish the `build/` folder.

---

## 🗺 Roadmap (Nice-to-haves)

- Recent searches history
- Dark mode toggle
- Repo previews (latest pinned/public repos)
- Keyboard shortcuts (e.g., `/` to focus the search box)

---

## 📄 License

MIT — or adapt to your needs. If this is for a portfolio piece, you can omit the license or choose a more suitable one.

---

## 🙌 Acknowledgements

- GitHub Users API
- Tailwind CSS
- React Testing Library
