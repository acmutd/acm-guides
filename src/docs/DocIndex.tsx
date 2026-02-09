// @ts-expect-error ts dumb
import React from 'react';
import { Link } from 'react-router-dom';
import { DOCS } from './registry';
import {GradientText} from "../components/navbar.tsx";

export default function DocsIndex() {
  return (
    <div className="py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          acm <GradientText>guides</GradientText>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Welcome to the ACM Guides. Here you can find guides, tutorials, and
          resources for our technical workshops.
        </p>
      </div>

      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">All guides:</h3>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-white/10 dark:bg-white/5">
        {DOCS.map((doc) => (
          <Link
            key={doc.slug}
            to={`/docs/${doc.slug}`}
            className="group flex gap-4 p-5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/5"
          >
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                  {doc.meta.title}
                </h3>
                <span className="shrink-0 text-sm font-medium text-orange-600 dark:text-orange-400">
                  Open →
                </span>
              </div>

              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {doc.meta.description || 'Learn more about this topic in our detailed guide.'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
