import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { CodeExample } from '../../types/docs.types';

interface CodeTabsProps {
  examples: CodeExample[];
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0);

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
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-white border-b border-gray-200">
        <nav className="flex space-x-1 p-1" aria-label="Tabs">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap rounded-md transition-all duration-200 ${
                activeTab === index
                  ? 'bg-lime text-dark border border-lime'
                  : 'text-dark hover:text-lime hover:bg-white/10'
              }`}
            >
              {example.title || languageNames[example.language] || example.language}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-0 bg-gray-900">
        <CodeBlock
          code={examples[activeTab].code}
          language={examples[activeTab].language}
        />
      </div>
    </div>
  );
};