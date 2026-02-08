import React from "react";
import {Link} from "react-router-dom";
import {getRecentWorkshops} from "../docs/registry";
import ParallaxImages from '../components/parallaxImages';
import Navbar from "../components/navbar.tsx";

function GradientText({
                          children,
                          gradient = "bg-development-gradient"
                      }: {
    children: React.ReactNode;
    gradient?: string
}) {
    return (
        <span className={`${gradient} bg-clip-text text-transparent bg-size-200 animate-gradient`}>
      {children}
    </span>
    );
}

function MiniWorkshopCard({
                              to,
                              title,
                              badge,
                          }: {
    to: string;
    title: string;
    badge?: string;
}) {
    return (
        <Link
            to={to}
            className="group relative flex min-w-[280px] flex-col justify-between rounded-xl bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 hover:border-pink-500/30 hover:-translate-y-1"
        >
            <div className="flex items-start justify-between gap-3">
                <h3 className="font-sans text-sm font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-2">
                    {title}
                </h3>
                {badge && (
                    <span
                        className="shrink-0 rounded-full bg-pink-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-200">
            {badge}
          </span>
                )}
            </div>
            <div className="mt-3 flex items-center justify-end">
        <span
            className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
            Open →
        </span>
            </div>
        </Link>
    );
}

export default function Home() {
    const recent = getRecentWorkshops(6);

    return (
        <main
            className="relative h-screen w-full overflow-hidden bg-black text-white font-sans selection:bg-pink-500/30">
            <Navbar/>
            <div className="absolute inset-0 z-0">
                <ParallaxImages/>
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"/>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between px-6 py-12 md:px-12">

                <div className="flex flex-1 flex-col items-center justify-center">

                    <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <span className="relative flex h-2 w-2">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                        powered by ACM dev
                    </span>
                        </div>
                    </div>

                    <div
                        className={`background-container z-10 flex w-1/2 flex-col items-center gap-y-4 rounded-3xl border border-primary/50 bg-gray-600/10 px-6 py-8 backdrop-blur-xl sm:px-12 sm:py-10 md:z-0 md:px-16 md:py-14 lg:px-24`}
                    >
                        <h1 className="text-center text-6xl md:text-8xl font-black tracking-tighter lowercase animate-in zoom-in-95 duration-700 delay-100 drop-shadow-2xl">
                            acm <GradientText>guides</GradientText>
                        </h1>

                        <p className="mt-6 max-w-xl text-center text-xl text-zinc-300 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            ACM's premier documentation site. <br/>
                            built by <span
                            className="text-white decoration-pink-500 underline underline-offset-4">students</span>,
                            for <span
                            className="text-white decoration-blue-500 underline underline-offset-4">students</span>.
                        </p>

                        <div
                            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <Link
                                to="/docs/workshops"
                                className="w-full sm:w-auto text-center rounded-full bg-white text-black px-8 py-3 text-sm font-black uppercase tracking-wide hover:bg-zinc-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                Start Learning
                            </Link>
                        </div>

                    </div>
                </div>

                <div className="w-full animate-in slide-in-from-bottom-20 duration-1000 delay-500">
                    <div className="mb-4 flex items-center justify-between px-2">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">
                            just pushed
                        </h2>
                        <Link to="/docs/workshops" className="text-xs font-bold text-pink-400 hover:text-pink-300">
                            view all →
                        </Link>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mask-linear-fade">
                        {recent.map((w, i) => (
                            <MiniWorkshopCard
                                key={w.slug}
                                to={`/docs/${w.slug}`}
                                title={w.meta.title}
                                badge={i === 0 ? "New" : undefined}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}