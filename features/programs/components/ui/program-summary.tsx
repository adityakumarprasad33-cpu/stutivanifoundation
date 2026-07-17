import React from 'react';
import type { Program } from '../../types/program.types';

export const ProgramSummary = ({ program }: { program: Program }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Short Description</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{program.shortDescription}</p>
      </div>

      {program.detailedDescription && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Detailed Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {program.detailedDescription}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Core Objectives</h3>
          {program.objectives.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {program.objectives.map((obj, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400">{obj}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No objectives defined.</p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Expected Outcomes</h3>
          {program.expectedOutcomes.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {program.expectedOutcomes.map((out, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-400">{out}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 italic">No outcomes defined.</p>
          )}
        </div>
      </div>
    </div>
  );
};
