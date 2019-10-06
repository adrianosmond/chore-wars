import React from 'react';
import classes from './CompletionStats.module.css';

const CompletionStats = ({ completionRatio, timeDifferences }) => {
  console.log(timeDifferences);
  return (
    <div>
      <div>
        {completionRatio.map(p => (
          <div key={p.id}>
            {p.name} - {p.completions}
          </div>
        ))}
      </div>
      <div>
        {timeDifferences.map((t, idx) => (
          <div key={idx}>{t}</div>
        ))}
      </div>
    </div>
  );
};

export default CompletionStats;
