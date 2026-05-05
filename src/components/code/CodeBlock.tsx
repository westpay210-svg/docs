import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group border border-slate-200 rounded overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-[11px] font-medium text-slate-400 font-mono">{title}</span>
        </div>
      )}
      <div className="relative">
        {(SyntaxHighlighter as any)({
          language,
          style: vscDarkPlus,
          showLineNumbers,
          customStyle: {
            margin: 0,
            borderRadius: 0,
            fontSize: '0.8125rem',
            lineHeight: '1.6',
          },
          children: code,
        })}
        <button
          onClick={copyToClipboard}
          className="absolute top-2.5 right-2.5 p-1.5 rounded bg-slate-700/80 hover:bg-slate-600 text-slate-400 hover:text-slate-200 transition-all opacity-0 group-hover:opacity-100"
          title="Copy"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-kiwi-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
