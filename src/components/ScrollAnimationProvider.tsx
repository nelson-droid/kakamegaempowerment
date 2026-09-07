"use client";

import { useEffect, useRef, useState, ReactNode, ElementType } from "react";

// ============================================================
// useScrollAnimation — Intersection Observer hook
// Reveals element when it scrolls into view.
// IMPORTANT: defaults to `visible = true` so SSR / no-JS shows
// content immediately. JS only adds the animation class.
// ============================================================
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  // Start as TRUE so content is visible if observer never fires
  // (e.g. already in viewport, reduced motion, or fast scroll).
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Respect reduced-motion preference: no animation, content visible.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is unavailable, show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // If the element is ALREADY in the viewport on mount, show
    // immediately without waiting for an intersection event.
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportH && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    // Otherwise, start hidden and observe for first intersection.
    setIsVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);

    // Safety net: if the observer never fires within 4s, force visible.
    const timeout = setTimeout(() => setIsVisible(true), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [threshold]);

  return { ref, isVisible };
}

// ============================================================
// AnimateIn — wrapper that fades children in on first scroll-in
// Now uses a single `is-revealed` class so the transition is
// always reversible and never makes content disappear forever.
// ============================================================
interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
  as?: ElementType;
}

export function AnimateIn({ children, delay = 0, direction = "up", className = "", as: Tag = "div" }: AnimateInProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // The `init` class is applied on the server & first client render
  // (no flash). Once `isVisible` becomes true, the `is-revealed` class
  // triggers the transition to the final position.
  const initialTransform: Record<string, string> = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    scale: "scale-95",
  };

  const init = `opacity-0 ${initialTransform[direction] ?? initialTransform.up}`;
  const revealed = "opacity-100 translate-y-0 translate-x-0 scale-100";

  // Pre-mount (SSR): render visible — no class manipulation.
  if (!mounted) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    // @ts-ignore - dynamic tag with ref
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`transition-all duration-700 ease-out will-change-transform ${className} ${
        isVisible ? revealed : init
      }`}
      style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

// ============================================================
// StaggeredList — reveals children one after another
// ============================================================
interface StaggeredListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  itemClassName?: string;
}

export function StaggeredList({ children, className = "", staggerDelay = 100 }: StaggeredListProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  const items = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={`transition-all duration-700 ease-out will-change-transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } ${className}`}
          style={{ transitionDelay: `${i * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
