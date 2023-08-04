import { RefObject, useEffect } from 'react';

export function useOnHoverOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mouseover', listener);
    return () => {
      document.removeEventListener('mouseout', listener);
    };
  }, [ref, handler]);
}
