import ParallaxImages from '../components/parallaxImages';
import Navbar from '../components/navbar';

function GradientText({
  children,
  gradient = 'bg-development-gradient',
}: {
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <span
      className={`${gradient} bg-clip-text text-transparent bg-size-200 animate-gradient inline-block px-1 py-1 leading-tight`}
    >
      {children}
    </span>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-zinc-50 text-zinc-900 font-sans selection:bg-pink-500/30 dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="absolute inset-0 z-0">
        <ParallaxImages />

        <div
          className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_center,transparent_10%,rgba(255,255,255,0.8)_100%)]
          dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-center items-center px-4 py-6 md:px-12 md:py-12">
        <div className="mb-4 md:mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm dark:border-white/20 dark:bg-white/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-800 dark:text-white/90">
              powered by ACM dev
            </span>
          </div>
        </div>

        <div
          className="background-container z-10 flex w-full max-w-5xl flex-col md:flex-row items-center justify-between gap-4 md:gap-8 rounded-3xl
          border border-zinc-200 bg-white/60 px-4 py-6 backdrop-blur-xl shadow-2xl
          sm:px-6 sm:py-8 md:px-12 lg:px-16
          dark:border-white/10 dark:bg-gray-600/10 dark:shadow-none transition-all duration-300"
        >
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 flex-1">
            <h1 className="text-center md:text-left text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter lowercase animate-in zoom-in-95 duration-700 delay-100 drop-shadow-sm dark:drop-shadow-2xl">
              <GradientText>404</GradientText>
            </h1>

            <div className="space-y-3 md:space-y-4">
              <h2 className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-zinc-900 dark:text-white">
                This page is still under construction
              </h2>

              <p className="text-center md:text-left text-base sm:text-lg text-zinc-700 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 dark:text-zinc-300">
                Looks like Peechi hasn't finished building this guide yet.
                Let's get you back to learning!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 w-full md:w-auto">
              <a
                href="/"
                className="text-center rounded-full bg-zinc-900 text-white px-6 py-2.5 md:px-8 md:py-3 text-sm font-black uppercase tracking-wide hover:bg-zinc-800 hover:scale-105 transition-all shadow-xl dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Start Learning
              </a>
              <a
                href="/docs"
                className="text-center rounded-full border-2 border-zinc-300 bg-transparent text-zinc-900 px-6 py-2.5 md:px-8 md:py-3 text-sm font-black uppercase tracking-wide hover:bg-zinc-100 hover:scale-105 transition-all dark:border-white/30 dark:text-white dark:hover:bg-white/10"
              >
                Browse All Docs
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 animate-float mt-4 md:mt-0">
            <img 
              src="/Peechi_UnderConstruction.png" 
              alt="Peechi working on construction"
              className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}