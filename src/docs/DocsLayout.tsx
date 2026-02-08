import React, { Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { DOCS, getDoc } from "./registry";

function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function DocsLayout() {
  const splat = useParams()["*"] ?? "";
  const slug = splat.replace(/\/+$/, "") || "getting-started";
  const entry = getDoc(slug);

  const LazyDoc = useMemo(() => {
    if (!entry) return null;
    return React.lazy(async () => {
      const mod = await entry.load();
      return { default: mod.default };
    });
  }, [entry?.slug]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-glow p-4 h-fit md:sticky md:top-6">
            <div className="text-xs font-semibold text-white/70 mb-3">Docs</div>

            <nav className="space-y-1">
              {DOCS.map((d) => (
                <NavLink
                  key={d.slug}
                  to={`/docs/${d.slug}`}
                  className={({ isActive }) =>
                    classNames(
                      "block rounded-xl px-3 py-2 text-sm",
                      "hover:bg-white/10",
                      isActive
                        ? "bg-orange-500/15 border border-orange-500/20 text-orange-100"
                        : "text-white/75"
                    )
                  }
                >
                  <div className="font-medium">{d.meta.title}</div>
                  {d.meta.description ? (
                    <div className="text-[12px] text-white/45 line-clamp-1">
                      {d.meta.description}
                    </div>
                  ) : null}
                </NavLink>
              ))}
            </nav>
          </aside>

          <main className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-glow p-6">
            {!entry ? (
              <div className="text-zinc-300/80">
                <h1 className="text-xl font-semibold text-white/90">Not found</h1>
                <p className="mt-2 text-sm text-white/60">
                  That doc page doesn’t exist yet.
                </p>
              </div>
            ) : (
              <Suspense
                fallback={<div className="text-sm text-white/60">Loading doc…</div>}
              >
                <article className="prose prose-invert max-w-none">
                  {LazyDoc ? <LazyDoc /> : null}
                </article>
              </Suspense>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
