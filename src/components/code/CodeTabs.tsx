import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { CodeExample } from '../../types/docs.types';

interface CodeTabsProps {
  examples: CodeExample[];
}

const languageNames: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  curl: 'cURL',
  python: 'Python',
  php: 'PHP',
  java: 'Java',
  csharp: 'C#',
  go: 'Go',
  ruby: 'Ruby',
  json: 'JSON',
};

export const CodeTabs: React.FC<CodeTabsProps> = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (examples.length === 0) return null;

  if (examples.length === 1) {
    return (
      <CodeBlock
        code={examples[0].code}
        language={examples[0].language}
        title={examples[0].title || languageNames[examples[0].language] || examples[0].language}
      />
    );
  }

  return (
    <div className="border border-slate-200 overflow-hidden">
      {/* Tab bar */}
      <div className="flex bg-slate-800 border-b border-slate-700 overflow-x-auto">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-[12px] font-medium whitespace-nowrap transition-colors ${
              activeTab === index
                ? 'text-kiwi-400 border-b-2 border-kiwi-400 bg-slate-900/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {example.title || languageNames[example.language] || example.language}
          </button>
        ))}
      </div>

      {/* Code */}
      <div className="bg-slate-900">
        <CodeBlock
          code={examples[activeTab].code}
          language={examples[activeTab].language}
        />
      </div>
    </div>
  );
};
