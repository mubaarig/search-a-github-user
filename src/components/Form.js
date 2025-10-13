import React, { useState } from "react";

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M21 21l-4.35-4.35m1.1-4.4a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function Form({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const u = username.trim();
    if (!u) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(u)}`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (res.status === 404) {
        setError("User not found.");
        return;
      }
      if (res.status === 403) {
        setError("Rate limit exceeded. Try again later.");
        return;
      }
      if (!res.ok) {
        setError(`GitHub error: ${res.status}`);
        return;
      }
      const data = await res.json();
      onSubmit(data);
      setUsername("");
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="relative rounded-2xl bg-white ring-1 ring-gray-950/5 shadow-sm dark:bg-gray-900 dark:ring-white/10">
        <div className="flex items-center">
          <div className="pl-4 text-gray-500 dark:text-gray-400">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username…"
            aria-label="GitHub username"
            className="w-full bg-transparent px-3 py-3 text-base outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
          />
          {username && !loading && (
            <button
              type="button"
              onClick={() => setUsername("")}
              className="mr-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Clear username"
              title="Clear"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="m-1 mr-1 inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm 
                       hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent"></span>
            )}
            <span>{loading ? "Searching…" : "Search"}</span>
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <span className="sr-only" aria-live="polite">
        {loading ? "Searching" : ""}
      </span>
    </form>
  );
}