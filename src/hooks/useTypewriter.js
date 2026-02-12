import { useState, useEffect } from 'react';

export const useTypewriter = (text, active, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayText('');
      setDone(false);
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, active, speed]);

  return { displayText, done };
};
