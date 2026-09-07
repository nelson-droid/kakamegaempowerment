"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  trigger?: boolean;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
  trigger = false,
}: AnimatedCounterProps) {
  // Start at the final value so SSR / no-JS / pre-observer shows the right number.
  // We only animate from 0 → end when the element scrolls into view.
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Respect reduced-motion: just show the final number, no counting.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    // If no IntersectionObserver, show the final value.
    if (typeof IntersectionObserver === "undefined") {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    const el = ref.current;
    if (!el) {
      setCount(end);
      return;
    }

    // If already visible on mount, just show the final value (no animation).
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < viewportH && rect.bottom > 0) {
      setCount(end);
      return;
    }

    // Otherwise, hide initial value and animate when in view.
    setCount(0);
    setHasAnimated(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    hasMountedRef.current = true;

    // Safety: if observer never fires, show final after 4s.
    const timeout = setTimeout(() => {
      setHasAnimated(true);
      setCount(end);
    }, 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [end]);

  useEffect(() => {
    if (!hasAnimated) return;
    if (count === end && performance.now() % 1 !== 0) return;

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (end - startValue) * eased);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Make sure we land exactly on the target
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, end, duration]);

  const formatted =
    end >= 1000 ? count.toLocaleString() : count.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
