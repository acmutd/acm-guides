export function GithubRepo({ url, name }: { url: string; name?: string }) {
  const repoName = name || url.replace(/^https?:\/\/github.com\//, '').replace(/\/$/, '');

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose group relative -my-6 flex w-full items-center gap-4 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-4 transition-all duration-300 hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-200/50 dark:border-white/10 dark:from-zinc-900 dark:to-zinc-800/50 dark:hover:border-white/20 dark:hover:shadow-white/10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/5 via-transparent to-zinc-900/5 dark:from-white/5 dark:via-transparent dark:to-white/5" />
      </div>

      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-zinc-50 shadow-md ring-1 ring-zinc-900/5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:ring-zinc-900/20 dark:from-zinc-800 dark:to-zinc-900 dark:ring-white/10 dark:group-hover:ring-white/30">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-zinc-900/20 to-zinc-900/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 dark:from-white/20 dark:to-white/20" />

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="relative z-10 h-8 w-8 fill-zinc-900 transition-all duration-300 group-hover:fill-zinc-950 dark:fill-white dark:group-hover:fill-white"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-0.5">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 transition-colors group-hover:text-zinc-900/80 dark:text-zinc-400 dark:group-hover:text-white/80">
          Workshop Repository
        </span>
        <span className="font-semibold text-zinc-900 transition-colors dark:text-zinc-100">
          {repoName}
        </span>
      </div>

      <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 transition-all duration-300 group-hover:bg-zinc-900 dark:bg-zinc-800 dark:group-hover:bg-white">
        <svg
          className="h-4 w-4 translate-x-0 fill-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:fill-white dark:fill-zinc-400 dark:group-hover:fill-zinc-900"
          viewBox="0 0 16 16"
        >
          <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z" />
        </svg>
      </div>
    </a>
  );
}