import React, { useState } from 'react';
import StackBar from '../../components/StackBar';

const data = [
  {
    year: 1980,
    '🥑': 10,
    '🍌': 20,
    '🍆': 30,
  },
  {
    year: 1990,
    '🥑': 20,
    '🍌': 40,
    '🍆': 60,
  },
  {
    year: 2000,
    '🥑': 30,
    '🍌': 45,
    '🍆': 80,
  },
  {
    year: 2010,
    '🥑': 40,
    '🍌': 60,
    '🍆': 100,
  },
  {
    year: 2020,
    '🥑': 50,
    '🍌': 80,
    '🍆': 120,
  },
];
const allKeys = ['🥑', '🍌', '🍆'];

const colors = {
  '🥑': 'green',
  '🍌': 'orange',
  '🍆': 'purple',
};
const StackedBarChart = () => {
  const [keys, setKeys] = useState(allKeys);
  return (
    <>
      <h2>StackedBarChart</h2>
      <StackBar data={data} keys={keys} colors={colors} />

      <div style={{ display: 'flex' }}>
        {allKeys.map((key) => (
          <div key={key} className='field'>
            <input
              id={key}
              type='checkbox'
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter((_key) => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default StackedBarChart;
