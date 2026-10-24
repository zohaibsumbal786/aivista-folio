import { Suspense, type ReactNode } from "react";
import { useInViewport } from "@/hooks/useInViewport";

/**
 * Wraps a heavy 3D scene so it only mounts (and renders) when scrolled into
 * view. Uses IntersectionObserver + Suspense so the underlying scene can be a
 * React.lazy() import, keeping it out of the initial bundle.
 */
export function LazyScene({
  children,
  className = "",
  fallback = null,
  rootMargin = "300px",
}: {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  rootMargin?: string;
}) {
  const [ref, inView] = useInViewport<HTMLDivElement>({
    rootMargin,
    threshold: 0.01,
  });
  return (
    <div ref={ref} className={`w-full h-full ${className}`}>
      {inView ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}
