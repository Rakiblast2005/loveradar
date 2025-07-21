
import React, { useState, useCallback } from 'react';
import { generateExcuse } from '../services/geminiService';

interface ExcuseGeneratorProps {
  isVisible: boolean;
}

const ExcuseGenerator: React.FC<ExcuseGeneratorProps> = ({ isVisible }) => {
  const [excuse, setExcuse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setExcuse('');
    const newExcuse = await generateExcuse();
    setExcuse(newExcuse);
    setIsLoading(false);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full max-w-lg p-4 bg-gray-800/60 border border-blue-500/20 rounded-lg transition-opacity duration-500">
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto flex-shrink-0 px-5 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Thinking...' : 'Need an Excuse?'}
        </button>
        <div className="w-full min-h-[40px] flex items-center justify-center text-center sm:text-left bg-gray-900/50 rounded-md p-2">
            {isLoading && <p className="text-sm text-gray-400">Generating a clever escape plan...</p>}
            {excuse && <p className="text-cyan-300 italic">"{excuse}"</p>}
            {!isLoading && !excuse && <p className="text-sm text-gray-500">Click the button to get an AI-generated excuse.</p>}
        </div>
      </div>
    </div>
  );
};

export default ExcuseGenerator;
