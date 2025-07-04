
import React, { useEffect, useRef } from 'react';

interface CodePreviewProps {
  code: string;
  highlightedLine: number | null | undefined;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code, highlightedLine }) => {
  const lines = code.split('\n');
  const highlightedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightedRef.current) {
      highlightedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [highlightedLine]);
  
  if (!code) {
    return null;
  }

  return (
    <div ref={containerRef} className="h-full bg-gray-900/70 border border-gray-700 rounded-md overflow-auto font-mono text-sm">
      <pre className="p-4 min-w-min">
        <code>
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = lineNumber === highlightedLine;
            return (
              <div
                key={lineNumber}
                ref={isHighlighted ? highlightedRef : null}
                className={`flex -mx-4 px-4 transition-colors duration-200 ${isHighlighted ? 'bg-cyan-900/50' : 'hover:bg-gray-700/30'}`}
              >
                <span className="w-10 text-right pr-4 text-gray-500 select-none flex-shrink-0">
                  {lineNumber}
                </span>
                <span className="flex-1 whitespace-pre-wrap break-words">
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
};
