import React, {
  Suspense,
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { NavLink, Link, useParams, useLocation } from 'react-router-dom';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  ALL_DOCS,
  SIDEBAR_TREE,
  getDoc,
  type DocNode,
  type CategoryNode,
} from './registry';
import Navbar from '../components/navbar.tsx';
import DocsIndex from './DocIndex';
import Pre from '../components/pre';
import { GithubRepo } from '../components/githubRepo.tsx';

function classNames(...xs: Array<string | false | undefined>) {
  return xs.filter(Boolean).join(' ');
}

function stripEmojis(str: string) {
  return str
    // this might error in ur IDE, it works tho trust
    .replace(/\p{Extended_Pictographic}|\uFE0F/gu, '')
    .trim();
}

function isNodeActive(
  node: DocNode | CategoryNode,
  currentPath: string
): boolean {
  if (node.type === 'doc') {
    const nodePath = `/docs/${node.slug}`.replace(/\/$/, '').toLowerCase();
    const activePath = decodeURIComponent(currentPath).replace(/\/$/, '').toLowerCase();
    return nodePath === activePath;
  }
  return node.items.some((child) => isNodeActive(child, currentPath));
}

// Mobile Drawer Components
function MobileSidebarDrawer({ 
  open, 
  onClose 
}: { 
  open: boolean; 
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" />
      
      <div className="fixed inset-0 flex">
        <Dialog.Panel className="relative w-full max-w-xs bg-white dark:bg-black">
          <div className="h-full overflow-y-auto p-6">
            <div className="mb-6">
              <Link
                to="/docs"
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-white/40 dark:hover:text-white"
              >
                Home
              </Link>
            </div>
            
            <nav className="space-y-0.5">
              {SIDEBAR_TREE.map((node, i) => (
                <SidebarItem key={i} node={node} onClose={onClose} />
              ))}
            </nav>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function MobileTOCDrawer({ 
  open, 
  onClose,
  headings,
  activeId,
  setActiveId
}: { 
  open: boolean; 
  onClose: () => void;
  headings: any[];
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" />
      
      <div className="fixed inset-0 flex justify-end">
        <Dialog.Panel className="relative w-full max-w-xs bg-white dark:bg-black">
          <div className="h-full overflow-y-auto p-6">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4">
              On this page
            </div>
            
            {headings.length === 0 ? (
              <div className="text-sm text-zinc-400 dark:text-zinc-500 italic">No subsections</div>
            ) : (
              <ul className="space-y-3">
                {headings.map((h) => (
                  <li key={h.id} style={{ paddingLeft: (h.level - 2) * 16 }}>
                    <a
                      href={`#${h.id}`}
                      className={classNames(
                        'block text-sm transition-colors',
                        activeId === h.id
                          ? 'text-orange-600 dark:text-orange-500 font-medium'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveId(h.id);
                        onClose();
                      }}
                    >
                      {stripEmojis(h.text)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function MobileDocHeader({ 
  entry, 
  onSidebarOpen,
  onTocOpen 
}: { 
  entry: any;
  onSidebarOpen: () => void;
  onTocOpen: () => void;
}) {  
  return (
    <div className="lg:hidden sticky top-20 z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10">
      <div className="flex items-center gap-3">
        <button 
          onClick={onSidebarOpen}
          className="p-2 -ml-2 text-zinc-600 hover:text-zinc-900 dark:text-white/60 dark:hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-0.5">
            GUIDE
          </div>
          <div className="text-sm font-medium text-zinc-900 dark:text-white/90 truncate">
            {entry.meta.title}
          </div>
        </div>
        <button 
          onClick={onTocOpen}
          className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-white/60 dark:hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SidebarItem({
  node,
  depth = 0,
  onClose,
}: {
  node: DocNode | CategoryNode;
  depth?: number;
  onClose?: () => void;
}) {
  const location = useLocation();
  const indentSize = 16;
  const basePadding = 16;

  if (node.type === 'doc') {
    return (
      <NavLink
        to={`/docs/${node.slug}`}
        onClick={onClose}
        className={({ isActive }) =>
          classNames(
            'group flex w-full min-w-0 items-center rounded-r-lg border-l-2 py-2 pr-2 text-sm font-medium transition-all duration-200 hover:text-zinc-900 dark:hover:text-white',
            isActive
              ? 'border-zinc-900 bg-zinc-100 text-zinc-900 dark:border-white dark:bg-white/10 dark:text-white'
              : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-white/5'
          )
        }
        style={{ paddingLeft: depth * indentSize + basePadding }}
      >
        <span className="truncate">{stripEmojis(node.title)}</span>
      </NavLink>
    );
  }

  const isActive = isNodeActive(node, location.pathname);

  return (
    <Disclosure
      as="div"
      key={`${node.name}-${isActive}`}
      defaultOpen={isActive || depth === 0}
      className="w-full"
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              'flex w-full min-w-0 items-center justify-between py-2 pr-2 text-left text-xs font-bold uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200',
              open ? 'text-zinc-900 dark:text-zinc-200' : ''
            )}
            style={{ paddingLeft: depth * indentSize + basePadding }}
          >
            <span className="truncate mr-2">{stripEmojis(node.name)}</span>
            <ChevronRightIcon
              className={classNames(
                'h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200',
                open ? 'rotate-90' : ''
              )}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="space-y-0.5 mt-1">
              {node.items.map((child, i) => (
                <SidebarItem key={i} node={child} depth={depth + 1} onClose={onClose} />
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

function useHeadings() {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<MutationObserver | null>(null);

  const contentRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      const parse = () => {
        const elements = Array.from(node.querySelectorAll('h2, h3'));

        const parsed = elements.map((elem) => ({
          id:
            elem.id ||
            elem.innerHTML
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]/g, ''),
          text: elem.textContent ?? '',
          level: Number(elem.tagName.substring(1)),
        }));

        elements.forEach((elem) => {
          if (!elem.id)
            elem.id = elem.innerHTML
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]/g, '');
        });

        setHeadings((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(parsed)) return prev;
          return parsed;
        });
      };

      parse();
      observerRef.current = new MutationObserver(parse);
      observerRef.current.observe(node, { childList: true, subtree: true });
    } else {
      observerRef.current?.disconnect();
    }
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = document.querySelectorAll('article h2, article h3');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [headings]);

  return { headings, activeId, setActiveId, contentRef };
}

function DocsContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  
  const params = useParams();
  const splat = params['*'] ?? '';
  const isIndex = splat === '' || splat === 'workshops';
  const slug = decodeURIComponent(splat.replace(/\/+$/, ''));
  const entry = isIndex ? null : getDoc(slug);
  const { headings, activeId, setActiveId, contentRef } = useHeadings();

  const { prev, next } = useMemo(() => {
    if (isIndex) return { prev: null, next: null };
    const idx = ALL_DOCS.findIndex((d) => d.slug === slug);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: ALL_DOCS[idx - 1] ?? null,
      next: ALL_DOCS[idx + 1] ?? null,
    };
  }, [slug, isIndex]);

  const mdxComponents = useMemo(() => ({ pre: Pre, GithubRepo }), []);

  const LazyDoc = useMemo(() => {
    if (!entry) return null;
    return React.lazy(async () => {
      const mod = await entry.load();
      // @ts-expect-error type safety is for the weak
      return { default: mod.default };
    });
  }, [entry]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <div className="fixed top-0 inset-x-0 z-50 h-20 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:bg-black/80 dark:border-white/10">
        <Navbar />
      </div>

      <div className="pt-20 flex">
        <aside
          className="fixed inset-y-0 top-20 left-0 z-30 hidden w-[320px]
          overflow-y-auto overflow-x-hidden border-r border-zinc-200 bg-white/50
          px-4 py-8 pb-20 backdrop-blur-xl dark:border-white/10 dark:bg-black/50 lg:block
          contain-content"
        >
          <div className="mb-6 px-4">
            <Link
              to="/docs"
              className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:text-white/40 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
          </div>

          <nav className="space-y-0.5">
            {SIDEBAR_TREE.map((node, i) => (
              <SidebarItem key={i} node={node} />
            ))}
          </nav>
          <div className="h-8" />
        </aside>

        <div className="flex-1 min-w-0 lg:pl-[320px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-10 xl:pr-[280px]">
              <main className="min-w-0">
                {isIndex ? (
                  <DocsIndex />
                ) : !entry ? (
                  <div className="py-12">
                    <div className="flex flex-col items-start gap-4">
                      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                        Doc not found
                      </h1>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        The page "{slug}" does not exist.
                      </p>
                      <Link
                        to="/docs"
                        className="text-orange-600 hover:underline"
                      >
                        Return to all docs
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Mobile Header */}
                    {!isIndex && entry && (
                      <MobileDocHeader 
                        entry={entry}
                        onSidebarOpen={() => setSidebarOpen(true)}
                        onTocOpen={() => setTocOpen(true)}
                      />
                    )}

                    {/* Desktop Breadcrumb */}
                    <div className="mb-6 hidden lg:flex items-center gap-2 text-sm text-zinc-500">
                      <Link
                        to="/docs"
                        className="hover:text-zinc-900 dark:hover:text-white"
                      >
                        Docs
                      </Link>
                      <span className="text-zinc-300 dark:text-zinc-700">
                        /
                      </span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-200">
                        {entry.meta.title}
                      </span>
                    </div>

                    <Suspense
                      key={slug}
                      fallback={
                        <div className="h-96 animate-pulse bg-zinc-100 dark:bg-white/5 rounded-2xl" />
                      }
                    >
                      <article
                        ref={contentRef}
                        className="prose prose-zinc max-w-none
                        dark:prose-invert

                        prose-a:text-orange-600 dark:prose-a:text-orange-400

                        prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-pre:m-0

                        prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                        dark:prose-code:text-orange-400 dark:prose-code:bg-white/10

                        prose-table:w-full prose-table:border-collapse
                        prose-thead:border-b prose-thead:border-zinc-200 dark:prose-thead:border-white/10
                        prose-tr:border-b prose-tr:border-zinc-200 dark:prose-tr:border-white/10
                        prose-th:bg-zinc-50 prose-th:p-4 prose-th:text-zinc-900
                        dark:prose-th:bg-white/5 dark:prose-th:text-zinc-100
                        prose-td:p-4 prose-td:text-zinc-700 dark:prose-td:text-zinc-300

                        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-100
                        dark:[&_pre_code]:bg-transparent dark:[&_pre_code]:text-zinc-100
                      "
                      >
                        <h1 className="mb-4 hidden lg:block">{entry.meta.title}</h1>
                        {LazyDoc ? (
                          // eslint-disable-next-line react-hooks/static-components
                          <LazyDoc components={mdxComponents} />
                        ) : null}
                      </article>
                    </Suspense>

                    <hr className="mt-12 border-zinc-200 dark:border-white/10" />

                    <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
                      {prev ? (
                        <Link
                          to={`/docs/${prev.slug}`}
                          className="flex flex-col items-start gap-1 rounded-xl border border-zinc-200 p-6 transition hover:border-orange-500/50 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Previous
                          </span>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                            {prev.meta.title}
                          </span>
                        </Link>
                      ) : (
                        <div />
                      )}
                      {next ? (
                        <Link
                          to={`/docs/${next.slug}`}
                          className="flex flex-col items-end gap-1 rounded-xl border border-zinc-200 p-6 transition hover:border-orange-500/50 hover:bg-zinc-50 dark:border-white/10 dark:hover:bg-white/5 text-right"
                        >
                          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                            Next
                          </span>
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                            {next.meta.title}
                          </span>
                        </Link>
                      ) : (
                        <div />
                      )}
                    </div>
                  </>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop TOC Sidebar */}
      {entry && !isIndex && (
        <aside className="fixed top-20 right-0 z-20 hidden w-[240px] h-[calc(100vh-5rem)] xl:block">
          <div className="h-full overflow-y-auto scrollbar-hover overflow-x-hidden pl-4 pr-6 pt-10 border-l border-zinc-200 dark:border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-4 -mt-1">
              On this page
            </div>
            {headings.length === 0 ? (
              <div className="text-sm text-zinc-400 italic">
                No subsections
              </div>
            ) : (
              <ul className="space-y-2.5 text-sm mb-8">
                {headings.map((h) => (
                  <li
                    key={h.id}
                    style={{ paddingLeft: (h.level - 2) * 20 }}
                  >
                    <a
                      href={`#${h.id}`}
                      className={classNames(
                        'block transition-colors duration-200 break-words',
                        activeId === h.id
                          ? 'text-orange-600 font-medium dark:text-orange-400'
                          : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(h.id)
                          ?.scrollIntoView({ behavior: 'smooth' });
                        setActiveId(h.id);
                      }}
                    >
                      {stripEmojis(h.text)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      )}

      {/* Mobile Drawers */}
      <MobileSidebarDrawer 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {!isIndex && entry && (
        <MobileTOCDrawer 
          open={tocOpen}
          onClose={() => setTocOpen(false)}
          headings={headings}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      )}
    </div>
  );
}

export default DocsContent;