import { useEffect, useState } from 'react';

/**
 * A custom hook to evluate media queries like CSS.
 * It returns a boolean value that indicates whether the media query matches or not.
 * @param query - The media query to evaluate, for example '(min-width: 768px)'. It should follow the CSS media query syntax.
 * @returns
 * `true` if the media query matches, `false` otherwise.
 *
 * @example
 * ```ts
 * const isMobile = useMediaQuery('(max-width: 767px)');
 *
 * if (isMobile) {
 *   // Do something for mobile devices
 * } else {
 *   // Do something for desktop or larger screens
 * }
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 */
export const useMediaQuery: (query: string) => boolean = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const matchQuery = window.matchMedia(query);

    if (matchQuery.matches !== matches) {
      setMatches(matchQuery.matches);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    matchQuery.addEventListener('change', handleChange);
    return () => matchQuery.removeEventListener('change', handleChange);
  }, [matches, query]);
  return matches;
};
