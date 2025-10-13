import React from "react";

function Stat({ label, value }) {
  return (
    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      {label}: <span className="font-semibold">{value}</span>
    </div>
  );
}

function Row({ icon, children }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
      <span className="opacity-70">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Card(props) {
  const {
    avatar_url,
    name,
    login,
    company,
    bio,
    location,
    followers,
    following,
    public_repos,
    html_url,
    blog,
    created_at,
  } = props;

  const displayName = name || login;
  const joined = created_at
    ? new Date(created_at).toLocaleDateString(undefined, { year: "numeric", month: "short" })
    : null;
  const blogUrl =
    blog && (blog.startsWith("http://") || blog.startsWith("https://"))
      ? blog
      : blog
      ? `https://${blog}`
      : null;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-950/5 shadow-sm transition
                 hover:shadow-md hover:ring-gray-950/10 dark:bg-gray-900 dark:ring-white/10"
    >
      <div className="flex items-start gap-4 p-5">
        <div className="shrink-0">
          <div className="rounded-full bg-gradient-to-tr from-indigo-500 to-sky-500 p-1">
            <img
              src={avatar_url}
              alt={login ? `${login}'s avatar` : "Avatar"}
              className="h-16 w-16 rounded-full bg-white object-cover ring-2 ring-white dark:ring-gray-900"
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-2">
            <a
              href={html_url}
              target="_blank"
              rel="noreferrer noopener"
              className="truncate text-lg font-semibold text-gray-900 hover:underline dark:text-gray-100"
              title={displayName}
            >
              {displayName}
            </a>
            {login && <span className="truncate text-gray-500 dark:text-gray-400">@{login}</span>}
            {joined && <span className="text-gray-400 dark:text-gray-500">· joined {joined}</span>}
          </div>
          {bio && <p className="mt-1 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">{bio}</p>}
          <div className="mt-2 flex flex-wrap gap-3">
            {company && (
              <Row
                icon={
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 21V4h6v17" />
                  </svg>
                }
              >
                {company}
              </Row>
            )}
            {location && (
              <Row
                icon={
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 21c-4-4-6-7-6-10a6 6 0 1112 0c0 3-2 6-6 10z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                }
              >
                {location}
              </Row>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Stat label="Repos" value={public_repos} />
            <Stat label="Followers" value={followers} />
            <Stat label="Following" value={following} />
          </div>
          <div className="mt-4 flex gap-2">
            {html_url && (
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50
                           dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Profile
              </a>
            )}
            {blogUrl && (
              <a
                href={blogUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50
                           dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                Website
              </a>
            )}
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300
                   group-hover:opacity-100 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500"
      />
    </article>
  );
}