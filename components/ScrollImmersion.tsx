"use client";

import { useEffect } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function ScrollImmersion() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

    if (reducedMotion) {
      root.style.setProperty("--scroll-progress", "0");
      root.style.setProperty("--atmo-shift", "0px");
      root.style.setProperty("--atmo-shift-rev", "0px");
      return;
    }

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const primaryShift = progress * 140;
      const secondaryShift = primaryShift * -0.6;

      root.style.setProperty("--scroll-progress", progress.toFixed(4));
      root.style.setProperty("--atmo-shift", `${primaryShift.toFixed(2)}px`);
      root.style.setProperty("--atmo-shift-rev", `${secondaryShift.toFixed(2)}px`);
    };

    const queueUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="immersive-layers">
        <div className="immersive-orb immersive-orb-a" />
        <div className="immersive-orb immersive-orb-b" />
        <div className="immersive-grid" />
      </div>
      <div aria-hidden className="scroll-progress-indicator" />
    </>
  );
}
