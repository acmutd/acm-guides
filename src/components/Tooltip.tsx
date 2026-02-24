import { useState } from 'react';

export function Tooltip({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dashed border-zinc-400 cursor-help"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </span>
      <span
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-zinc-900 text-white text-xs p-2 z-50 shadow-lg pointer-events-none transition-all duration-200 origin-bottom ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        {tip}
      </span>
    </span>
  );
}
