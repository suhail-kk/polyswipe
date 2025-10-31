'use client';

import { useState } from 'react';
import { lessonService } from '@/services/lesson';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';

interface LessonFormProps {
  onLessonAdded: () => void;
}

export default function LessonForm({ onLessonAdded }: LessonFormProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'edit' | 'view'>('edit');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const lessons = JSON.parse(jsonInput);
      await lessonService.saveLessons(lessons);
      setJsonInput('');
      onLessonAdded();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.duplicates) {
        const duplicates = error.response.data.duplicates;
        const message = error.response.data.message || "Duplicate lessons found.";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setError(`${message}\n\nDuplicate Entries:\n` + duplicates.map((d: any) => `- ${d.english} (${d.category})`).join("\n"));
      } else {
        setError(error instanceof Error ? error.message : "Invalid JSON format");
      }
    }
    finally {
      setLoading(false);
    }
  };

  const exampleJson = `[
  {
    "english": "Hello",
    "malayalam": "ഹലോ",
    "hindi": "नमस्ते",
    "category": "greetings",
    "type": "word",
    "pronunciation": {
      "malayalam": "halo",
      "hindi": "namaste"
    }
  }
]`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-4 bg-white/5 p-1 rounded-full border border-white/10 w-fit mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'edit'
            ? 'bg-white/20 text-white shadow-md'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          Edit
        </button>
        <button
          type="button"
          disabled={!jsonInput}
          onClick={() => setActiveTab('view')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'view'
            ? 'bg-white/20 text-white shadow-md'
            : 'text-gray-300 hover:text-white'
            }`}
        >
          View
        </button>
      </div>

      {/* Edit Tab */}
      {activeTab === 'edit' && (
        <div className="space-y-2">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={exampleJson}
            className="w-full h-64 p-3 border border-white/20 rounded-2xl font-mono text-sm bg-white/5 text-white placeholder:text-gray-400"
            required
          />
        </div>
      )}

      {/* View Tab */}
      {activeTab === 'view' && jsonInput && (
        <div className="rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10">
          <JsonView
            value={JSON.parse(jsonInput)}
            style={darkTheme}
            displayDataTypes={false}
            collapsed={false}
          />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-400/40 text-red-300 rounded-2xl font-mono text-sm whitespace-pre-wrap">
          {error.includes('Duplicate') ? (
            <>
              <p className="font-semibold mb-2">{error.split('\n\n')[0]}</p>
              <ul className="list-disc ml-5 space-y-1">
                {error
                  .split('\n')
                  .filter((line) => line.startsWith('- '))
                  .map((line, i) => (
                    <li key={i}>{line.replace('- ', '')}</li>
                  ))}
              </ul>
            </>
          ) : (
            error
          )}
        </div>
      )}


      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 mt-6 rounded-full font-semibold text-white shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
             bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 active:scale-95"
      >
        {loading ? 'Adding...' : 'Add Lessons'}
      </button>
    </form>
  );
}
