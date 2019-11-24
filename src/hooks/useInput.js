import { useState, useCallback } from 'react';

export default value => {
  const [input, setInput] = useState(value);
  const updateInput = useCallback(e => setInput(e.target.value), []);
  return [input, updateInput, setInput];
};
