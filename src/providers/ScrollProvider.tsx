import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { scrollableDivAtom } from '@/store/focusAtoms';

const ScrollProvider: React.FC = () => {
  const scrollableDiv = useAtomValue(scrollableDivAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['PageUp', 'PageDown'].includes(e.key) && scrollableDiv?.current) {
        e.preventDefault();
        const scrollAmount = scrollableDiv.current.clientHeight * 0.1;
        scrollableDiv.current.scrollBy({
          top: e.key === 'PageUp' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollableDiv]);

  return null;
};

export default ScrollProvider;
