import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../ThemeContext';

const links = [
  { name: 'home', to: '/' },
  { name: 'all docs', to: '/docs/workshops' },
];

const SunIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

function navLinkClass(isActive: boolean) {
  return [
    'rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all',
    'border',
    isActive
      ? 'bg-zinc-900/5 border-zinc-900/10 text-zinc-900 dark:bg-white/10 dark:text-white dark:border-white/20'
      : 'bg-transparent border-transparent text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/70 dark:hover:border-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  ].join(' ');
}

export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-development-gradient bg-clip-text text-transparent bg-size-200 animate-gradient">
      {children}
    </span>
  );
}

export default function Navbar({
  hideMobileMenu = false,
}: {
  hideMobileMenu?: boolean;
}) {
  const [top, setTop] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY === 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const chrome = top
    ? 'bg-white/0 border-b border-transparent'
    : 'bg-white/80 backdrop-blur-xl border-b border-zinc-200 dark:bg-black/70 dark:border-white/10';

  return (
    <Disclosure
      as="nav"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${chrome}`}
    >
      {({ open }) => (
        <>
          <div className="mx-0 max-w-12xl px-6 md:px-12">
            <div className="flex h-20 items-center justify-between">
              <Link to="/" className="group flex items-center gap-3">
                <img
                  src="/assets/chapter-logo.png"
                  alt="ACM Logo"
                  className="h-32 w-32 object-contain transition-all duration-300 invert dark:invert-0"
                />
                <div className="block text-2xl font-extralight">|</div>
                <div className="flex flex-col leading-none">
                  <span className="font-black tracking-tighter text-xl text-zinc-900 dark:text-white">
                    acm <GradientText>guides</GradientText>
                  </span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {links.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => navLinkClass(isActive)}
                  >
                    {item.name}
                  </NavLink>
                ))}

                <a
                  href="https://github.com/acmutd/acm-guides"
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white transition-all"
                >
                  <span>github</span>
                  <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                </a>

                <button
                  onClick={toggleTheme}
                  className="ml-2 flex items-center justify-center rounded-full border border-zinc-200 bg-white h-9 w-9 text-zinc-500 hover:bg-zinc-50 hover:text-orange-500 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-orange-400 transition-all"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
              </div>

              {!hideMobileMenu && (
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 p-2 text-zinc-900 hover:bg-zinc-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition-all">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </div>

          {!hideMobileMenu && (
            <>
              {open && (
                <Disclosure.Button
                  className="fixed left-0 right-0 bottom-0 top-20 z-40 bg-black/20 dark:bg-black/40 md:hidden min-h-screen"
                  aria-label="Close menu"
                />
              )}

              <Disclosure.Panel className="fixed inset-x-0 top-20 z-50 md:hidden bg-white/90 backdrop-blur-xl border-t border-zinc-200 dark:bg-black/70 dark:border-white/10">
                <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-2">
                  {links.map((item) => (
                    <Disclosure.Button
                      key={item.to}
                      as={NavLink}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }: { isActive: boolean }) =>
                        navLinkClass(isActive)
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}

                  <div className="h-px bg-zinc-200 dark:bg-white/10 my-2" />

                  <a
                    href="https://github.com/acmutd/acm-guides"
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-between rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white transition-all"
                  >
                    <span>GitHub Repo</span>
                    <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                  </a>

                  <button
                    onClick={toggleTheme}
                    className="flex w-full items-center justify-between rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white transition-all"
                  >
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                  </button>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </>
      )}
    </Disclosure>
  );
}
