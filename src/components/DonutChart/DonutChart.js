import React from 'react';
import classes from './DonutChart.module.css';

const colors = [
  'var(--color-teal-500)',
  'var(--color-orange-500)',
  'var(--color-blue-500)',
  'var(--color-yellow-500)',
  'var(--color-purple-700)',
  'var(--color-pink-500)',
  'var(--color-indigo-500)',
  'var(--color-green-700)',
  'var(--color-red-700)',
];

const CENTER = 80;
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutCircle = ({ stroke, ...props }) => (
  <circle
    cx={CENTER}
    cy={CENTER}
    r={RADIUS}
    fill="transparent"
    strokeWidth="12"
    stroke={stroke}
    {...props}
  />
);

const DonutChart = ({ data }) => {
  let angleOffset = -90;
  const total = data.reduce((acc, val) => acc + val.value, 0);
  const sorted = data.sort((a, b) => a.value - b.value);

  sorted.forEach(({ value }, index) => {
    const percentage = value / total;
    sorted[index].dashOffset = CIRCUMFERENCE - percentage * CIRCUMFERENCE;
    sorted[index].transform = `rotate(${angleOffset} ${CENTER} ${CENTER})`;
    angleOffset += percentage * 360;
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.legend}>
        {sorted.map(({ label }, index) => (
          <div className={classes.legendItem} key={label}>
            <div
              style={{ backgroundColor: colors[index] }}
              className={classes.colorSwatch}
            />
            {label}
          </div>
        ))}
      </div>
      <svg height="130" width="130" viewBox="0 0 160 160">
        {sorted.length === 0 ? (
          <DonutCircle stroke="var(--color-gray-400)" />
        ) : (
          sorted.map(({ label, dashOffset, transform }, index) => (
            <DonutCircle
              key={label}
              stroke={colors[index]}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              transform={transform}
            />
          ))
        )}
      </svg>
    </div>
  );
};

export default DonutChart;
