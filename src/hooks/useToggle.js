import { useState, useCallback } from 'react';

export default (value = false) => {
  const [isVisible, setIsVisible] = useState(value);
  const hide = useCallback(() => setIsVisible(false), []);
  const show = useCallback(() => setIsVisible(true), []);

  return [isVisible, show, hide];
};
