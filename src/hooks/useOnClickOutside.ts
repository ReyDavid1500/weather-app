import { useEffect, useRef } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the clicked element is inside the ref element
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler]);

  return ref;
}
