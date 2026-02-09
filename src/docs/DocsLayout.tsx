import React, {Suspense, useMemo, useState, useEffect} from "react";
import {NavLink, Link, useParams} from "react-router-dom";
import {DOCS, getDoc} from "./registry";
import {ThemeProvider} from "../ThemeContext";
import Navbar from "../components/navbar.tsx";

function classNames(...xs: Array<string | false | undefined>) {
    return xs.filter(Boolean).join(" ");
}

function useHeadings() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const elements = Array.from(document.querySelectorAll("article h2, article h3"));
            const parsed = elements.map((elem) => ({
                id: elem.id || elem.innerHTML.toLowerCase().replace(/\s+/g, "-"),
                text: elem.textContent ?? "",
                level: Number(elem.tagName.substring(1)),
            }));
            elements.forEach((elem) => {
                if (!elem.id) elem.id = elem.innerHTML.toLowerCase().replace(/\s+/g, "-");
            });
            setHeadings(parsed);
        }, 150);

        return () => clearTimeout(timeout);
    }, [window.location.pathname]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            {rootMargin: "0px 0px -80% 0px"}
        );
        const elements = document.querySelectorAll("article h2, article h3");
        elements.forEach((elem) => observer.observe(elem));
        return () => observer.disconnect();
    }, [headings]);

    return {headings, activeId, setActiveId};
}

function DocsContent() {
    const params = useParams();
    const splat = params["*"] ?? "";
    const slug = splat.replace(/\/+$/, "") || "getting-started";
    const entry = getDoc(slug);

    const {headings, activeId, setActiveId} = useHeadings();

    const {prev, next} = useMemo(() => {
        const idx = DOCS.findIndex((d) => d.slug === slug);
        if (idx === -1) return {prev: null, next: null};
        return {
            prev: DOCS[idx - 1] ?? null,
            next: DOCS[idx + 1] ?? null,
        };
    }, [slug]);

    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    const LazyDoc = useMemo(() => {
        if (!entry) return null;
        return React.lazy(async () => {
            const mod = await entry.load();
            return {default: mod.default};
        });
    }, [entry?.slug]);

    return (
        <div
            className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
            <div
                className="fixed top-0 inset-x-0 z-50 h-20 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:bg-black/80 dark:border-white/10">
                <Navbar/>
            </div>

            <div className="pt-20 flex">
                <aside
                    className="fixed inset-y-0 top-20 left-0 z-30 hidden w-[280px] overflow-y-auto border-r border-zinc-200 bg-white/50 px-6 py-8 pb-20 backdrop-blur-xl dark:border-white/10 dark:bg-black/50 lg:block">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-white/40 mb-4">
                        Documentation
                    </div>
                    <nav className="space-y-1">
                        {DOCS.map((d) => (
                            <NavLink
                                key={d.slug}
                                to={`/docs/${d.slug}`}
                                className={({isActive}) =>
                                    classNames(
                                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                                        isActive
                                            ? "bg-zinc-100 text-zinc-900 font-bold dark:bg-white/10 dark:text-orange-400"
                                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-200"
                                    )
                                }
                            >
                                {d.meta.title}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <div className="flex-1 min-w-0 lg:pl-[280px]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 xl:grid-cols-[1fr_240px] gap-10 py-10">

                            <main className="min-w-0">
                                {!entry ? (
                                    <div className="py-12">
                                        <div className="flex flex-col items-start gap-4">
                                            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Doc not
                                                found</h1>
                                            <p className="text-lg text-zinc-600 dark:text-zinc-400">The page "{slug}"
                                                does not exist.</p>
                                            <div
                                                className="mt-8 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-white/10 dark:bg-white/5">
                                                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Available
                                                    Guides</h3>
                                                <div className="grid gap-2 sm:grid-cols-2">
                                                    {DOCS.map((d) => (
                                                        <Link
                                                            key={d.slug}
                                                            to={`/docs/${d.slug}`}
                                                            className="block rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-orange-500/50 dark:border-white/10 dark:bg-black"
                                                        >
                                                            <div
                                                                className="font-semibold text-zinc-900 dark:text-zinc-200">{d.meta.title}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
                                            <span>Docs</span>
                                            <span className="text-zinc-300 dark:text-zinc-700">/</span>
                                            <span
                                                className="font-medium text-zinc-900 dark:text-zinc-200">{entry.meta.title}</span>
                                        </div>

                                        <Suspense fallback={<div
                                            className="h-96 animate-pulse bg-zinc-100 dark:bg-white/5 rounded-2xl"/>}>
                                            <article className="prose prose-zinc max-w-none
                        dark:prose-invert

                        // LINKS
                        prose-a:text-orange-600 dark:prose-a:text-orange-400

                        // CODE BLOCKS
                        prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:border prose-pre:border-zinc-700
                        dark:prose-pre:bg-white/5 dark:prose-pre:border-white/10 dark:prose-pre:text-zinc-100

                        // INLINE CODE
                        prose-code:text-orange-300 prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                        dark:prose-code:text-orange-300 dark:prose-code:bg-white/10

                        [&_pre_code]:bg-transparent [&_pre_code]:p-0
                        dark:[&_pre_code]:bg-transparent
                      ">
                                                <h1 className="mb-4">{entry.meta.title}</h1>
                                                {/* eslint-disable-next-line react-hooks/static-components */}
                                                {LazyDoc ? <LazyDoc/> : null}
                                            </article>
                                        </Suspense>

                                        <hr className="my-12 border-zinc-200 dark:border-white/10"/>

                                        <div className="grid grid-cols-2 gap-4">
                                            {prev ? (
                                                <Link
                                                    to={`/docs/${prev.slug}`}
                                                    className="flex flex-col items-start gap-1 rounded-xl border border-zinc-200 p-6 transition hover:border-orange-500/50 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                                                >
                                                    <span
                                                        className="text-xs font-bold uppercase tracking-wider text-zinc-400">Previous</span>
                                                    <span
                                                        className="font-semibold text-zinc-900 dark:text-zinc-200">{prev.meta.title}</span>
                                                </Link>
                                            ) : <div/>}
                                            {next ? (
                                                <Link
                                                    to={`/docs/${next.slug}`}
                                                    className="flex flex-col items-end gap-1 rounded-xl border border-zinc-200 p-6 transition hover:border-orange-500/50 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5 text-right"
                                                >
                                                    <span
                                                        className="text-xs font-bold uppercase tracking-wider text-zinc-400">Next</span>
                                                    <span
                                                        className="font-semibold text-zinc-900 dark:text-zinc-200">{next.meta.title}</span>
                                                </Link>
                                            ) : <div/>}
                                        </div>
                                    </>
                                )}
                            </main>

                            {entry && (
                                <aside className="hidden xl:block">
                                    <div
                                        className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pl-4 border-l border-zinc-200 dark:border-white/10">
                                        <div
                                            className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">On
                                            this page
                                        </div>
                                        {headings.length === 0 ? (
                                            <div className="text-sm text-zinc-400 italic">No subsections</div>
                                        ) : (
                                            <ul className="space-y-2.5 text-sm">
                                                {headings.map((h) => (
                                                    <li key={h.id} style={{paddingLeft: (h.level - 2) * 12}}>
                                                        <a
                                                            href={`#${h.id}`}
                                                            className={classNames(
                                                                "block transition-colors duration-200",
                                                                activeId === h.id
                                                                    ? "text-orange-600 font-medium dark:text-orange-400 translate-x-1"
                                                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                                                            )}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                document.getElementById(h.id)?.scrollIntoView({behavior: "smooth"});
                                                                setActiveId(h.id);
                                                            }}
                                                        >
                                                            {h.text}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </aside>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DocsLayoutWrapper() {
    return (
        <ThemeProvider>
            <DocsContent/>
        </ThemeProvider>
    );
}
