import React, { useState, useRef } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function Pre({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const onCopy = () => {
    if (!preRef.current) return;
    const text = preRef.current.textContent || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4 rounded-lg border border-zinc-700 bg-zinc-900 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700/50 bg-white/5 dark:border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 rounded bg-white/5 px-2 py-1 text-xs font-medium text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre
        ref={preRef}
        {...props}
        className={`${className || ''} overflow-x-auto !pl-4 !pt-4 !pb-4 !pr-4 text-base leading-relaxed text-zinc-100 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent`}
      >
        {children}
      </pre>
    </div>
  );
}
