import React from "react";
import { Link } from "react-router-dom";
import { getRecentWorkshops } from "../docs/registry";
import ParallaxImages from '../components/parallaxImages';

// Helper for the gradient text inside the hero
function GradientText({
  children,
  gradient = "bg-acm-gradient"
}: {
  children: React.ReactNode;
  gradient?: string
}) {
  return (
    <span className={`${gradient} bg-clip-text text-transparent bg-size-200`}>
      {children}
    </span>
  );
}

// Workshop Card Component
function WorkshopCard({
  to,
  title,
  desc,
  updated,
  badge,
  index
}: {
  to: string;
  title: string;
  desc?: string;
  updated?: string;
  badge?: string;
  index: number;
}) {
  const gradients = [
    "group-hover:border-pink-500/50",
    "group-hover:border-blue-500/50",
    "group-hover:border-green-500/50",
    "group-hover:border-orange-500/50",
  ];
  const activeGradient = gradients[index % gradients.length];

  return (
    <Link
      to={to}
      className={`
        group relative flex flex-col justify-between
        rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md
        p-6 transition-all duration-300
        hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-2xl
        ${activeGradient}
      `}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-sans text-xl font-bold text-white tracking-wide">
            {title}
          </h3>
          {badge && (
            <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {badge}
            </span>
          )}
        </div>
        {desc && (
          <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">
            {desc}
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-xs text-white/40 font-mono">
          {updated || "Recently"}
        </span>
        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center transition-colors group-hover:bg-white/20">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const recent = getRecentWorkshops(6);

  return (
    // Main container mirroring the background style of the provided snippet
    <main className="relative flex h-fit flex-col bg-[url(/assets/apply/apply-bg.png)] bg-cover text-white font-sans">

      {/* Keeping Parallax as requested in previous turns, but it sits behind */}
      <ParallaxImages />

      {/* Hero Section - Exact Styling Replica */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="flex flex-col items-center justify-center">
          <div className="z-10 flex w-full max-w-7xl flex-col gap-y-8">

            {/* The Main Hero Glass Container */}
            <div
              className={`background-container z-10 flex w-full flex-col items-center gap-y-4 rounded-3xl border border-primary/50 bg-gray-600/10 px-6 py-8 backdrop-blur-xl sm:px-12 sm:py-10 md:z-0 md:px-16 md:py-14 lg:px-24`}
            >
              {/* Top Tag - "Powered by..." */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-2">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                 </span>
                 <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">
                    ACM Development
                 </span>
              </div>

              {/* Title - Matching the size and weight of the snippet */}
              <h1 className="text-center text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl lowercase">
                acm utd <GradientText>guides</GradientText>
              </h1>

              {/* Description - Matching the font sizes */}
              <p className="md:text-md text-center text-base sm:text-lg lg:text-xl text-gray-200">
                we&apos;re a team of students with one goal: building a greater, more collaborative
                computing community. this is our knowledge base.
              </p>

              {/* Action Buttons - Wrapped in the specific style container from the snippet */}
              <div className="z-10 flex w-fit flex-row items-center justify-center gap-x-4 rounded-lg border border-primary/50 bg-gray-300/10 bg-acm-gradient px-4 py-3 sm:gap-x-6 sm:px-6 sm:py-4 md:px-8 mt-4">
                <Link
                  to="/docs/getting-started"
                  className="text-sm font-bold text-white hover:text-white/80 transition-colors"
                >
                  start learning
                </Link>
                <div className="h-4 w-[1px] bg-white/30" />
                <Link
                  to="/docs/workshops"
                  className="text-sm font-bold text-white hover:text-white/80 transition-colors"
                >
                  browse modules
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* Content Section - Why Join / Workshops */}
      <div className="py-10 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-12 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">

        <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold lowercase">just <GradientText gradient="bg-media-gradient">pushed</GradientText></h2>
              <p className="text-white/50 mt-2 font-light text-sm sm:text-base">fresh guides from the team.</p>
            </div>
            <Link to="/docs/workshops" className="hidden md:block text-sm font-bold text-white/70 hover:text-white transition-colors">
              view all &rarr;
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((w, i) => (
              <WorkshopCard
                key={w.slug}
                index={i}
                to={`/docs/${w.slug}`}
                title={w.meta.title}
                desc={w.meta.description}
                updated={w.meta.updated}
                badge={i === 0 ? "New" : undefined}
              />
            ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-24 flex w-full flex-col items-center justify-center">
            <div className="background-container flex w-full flex-col items-center gap-y-4 rounded-3xl border border-primary/30 bg-gray-600/10 px-6 py-8 backdrop-blur-xl text-center">
                <h2 className="text-xl font-bold lowercase sm:text-2xl">
                    contribute to the <span className="text-transparent bg-clip-text bg-hackutd-gradient">collection</span>
                </h2>
                <p className="text-sm text-gray-300 max-w-lg">
                    found a typo? want to add a diagram? the site is open source and driven by PRs.
                </p>
                <a
                href="https://github.com/acmutd/acm-guides"
                className="mt-2 inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-gray-300/10 px-6 py-2 text-sm font-bold hover:bg-white/10 transition-colors"
                >
                GitHub Repo
                </a>
            </div>
        </div>

      </div>
    </main>
  );
}