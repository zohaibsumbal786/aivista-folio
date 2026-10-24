import { useEffect, useRef, useState } from "react";

/** IntersectionObserver-based viewport hook. Returns [ref, inView]. */
export function useInViewport<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { rootMargin: "200px", threshold: 0.01 },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      options,
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}
