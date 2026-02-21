"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  reverse?: boolean;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type ScrollSubscriber = () => void;

const subscribers = new Set<ScrollSubscriber>();
let rafId = 0;
let initialized = false;

function flushSubscribers() {
  rafId = 0;
  subscribers.forEach((fn) => fn());
}

function queueFlush() {
  if (!rafId) rafId = window.requestAnimationFrame(flushSubscribers);
}

function ensureGlobalTicker() {
  if (initialized) return;
  initialized = true;
  window.addEventListener("scroll", queueFlush, { passive: true });
  window.addEventListener("resize", queueFlush);
}

function subscribeToTicker(fn: ScrollSubscriber) {
  ensureGlobalTicker();
  subscribers.add(fn);
  queueFlush();
  return () => {
    subscribers.delete(fn);
  };
}

export default function ParallaxScene({
  children,
  className = "",
  distance = 34,
  reverse = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    if (reducedMotion) {
      node.style.setProperty("--parallax-offset", "0px");
      node.style.setProperty("--parallax-opacity", "1");
      node.style.setProperty("--reveal-shift", "0px");
      node.style.setProperty("--reveal-opacity", "1");
      return;
    }

    const direction = reverse ? -1 : 1;

    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      const isNearViewport =
        rect.top < viewportHeight * 1.25 && rect.bottom > viewportHeight * -0.35;

      if (!isNearViewport) {
        const outOfViewBelow = rect.top > viewportHeight;
        ref.current.style.setProperty("--parallax-offset", "0px");
        ref.current.style.setProperty("--parallax-opacity", "0.92");
        ref.current.style.setProperty("--reveal-opacity", "0");
        ref.current.style.setProperty("--reveal-shift", outOfViewBelow ? "30px" : "-30px");
        return;
      }

      const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
      const normalized = Math.max(-1, Math.min(1, centerOffset / viewportHeight));
      const translateY = -normalized * distance * direction;

      const intersectionTop = Math.max(rect.top, 0);
      const intersectionBottom = Math.min(rect.bottom, viewportHeight);
      const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
      const visibleRatio = Math.min(1, intersectionHeight / Math.min(rect.height, viewportHeight));

      const revealOpacity =
        visibleRatio <= 0 ? 0 : Math.min(1, 0.2 + visibleRatio * 0.92);
      const revealDirection = rect.top > viewportHeight / 2 ? 1 : -1;
      const revealShift = (1 - revealOpacity) * 26 * revealDirection;

      const ambientOpacity = Math.max(0.78, 1 - Math.abs(normalized) * 0.16);

      ref.current.style.setProperty("--parallax-offset", `${translateY.toFixed(2)}px`);
      ref.current.style.setProperty("--parallax-opacity", ambientOpacity.toFixed(3));
      ref.current.style.setProperty("--reveal-opacity", revealOpacity.toFixed(3));
      ref.current.style.setProperty("--reveal-shift", `${revealShift.toFixed(2)}px`);
    };
    return subscribeToTicker(update);
  }, [distance, reverse]);

  return (
    <div ref={ref} className={`parallax-scene ${className}`}>
      {children}
    </div>
  );
}
