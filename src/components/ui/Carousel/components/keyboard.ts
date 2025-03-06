import { useEffect } from 'react';

export interface UseKeyboardProps {
  isEnabled: boolean | undefined;
  onNext: () => void;
  onPrev: () => void;
  elementRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook for handling keyboard events
 * @param {object} props - {@link UseKeyboardProps}
 * @param {boolean} props.isEnabled - Whether the keyboard events should be enabled
 * @param {function} props.onNext - The function to be called when the next slide is triggered
 * @param {function} props.onPrev - The function to be called when the previous slide is triggered
 * @returns {function} A function that removes the event listener when the component is unmounted
 */
export const useKeyboard = ({ isEnabled, onNext, onPrev, elementRef }: UseKeyboardProps) => {
  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const carouselElement = elementRef.current;

      if (!carouselElement) return;

      const rect = carouselElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const isPartiallyVisible =
        rect.top < windowHeight && rect.bottom > 0 && rect.left < windowWidth && rect.right > 0;

      if (isPartiallyVisible) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          onNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onPrev();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnabled, onNext, onPrev, elementRef]);
};
