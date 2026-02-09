// @ts-expect-error ts dumb
import React from "react";
import {Link} from "react-router-dom";
import {DOCS} from "./registry";

export default function DocsIndex() {
    return (
        <div className="py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                    Guides
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                    Welcome to the ACM Guides. Here you can find guides, tutorials, and resources for
                    our technical workshops.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {DOCS.map((doc) => (
                    <Link
                        key={doc.slug}
                        to={`/docs/${doc.slug}`}
                        className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-orange-500/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-orange-400/50"
                    >
                        <div>
                            <div
                                className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-zinc-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                                {doc.meta.title}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                                {doc.meta.description || "Learn more about this topic in our detailed guide."}
                            </p>
                        </div>

                        <div
                            className="mt-4 flex items-center text-sm font-medium text-orange-600 dark:text-orange-400">
                            Read Guide <span
                            className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
