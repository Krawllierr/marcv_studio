"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import ParallaxScene from "./ParallaxScene";

export default function Hero() {
  const scrollToDemo = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-impact pt-24 lg:pt-32 pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ParallaxScene distance={26}>
            <div className="immersive-stagger">
              <p
                style={{ "--stagger-index": 0 } as React.CSSProperties}
                className="stagger-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.12em] text-accent"
              >
                Unreal Engine Experience
              </p>
              <h1
                style={{ "--stagger-index": 1 } as React.CSSProperties}
                className="stagger-item mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.03] tracking-tight"
              >
                Interactive Archviz
                <span className="hero-title-glow block">that closes faster.</span>
              </h1>
              <p
                style={{ "--stagger-index": 2 } as React.CSSProperties}
                className="stagger-item mt-6 text-lg text-gray-300 max-w-xl"
              >
                Guide buyers through unit selection, sun studies, and amenities in a
                touchscreen-ready sales gallery.
              </p>

              <div
                style={{ "--stagger-index": 3 } as React.CSSProperties}
                className="stagger-item mt-8 flex flex-wrap gap-2"
              >
                <span className="hero-metric-chip">+37% qualified leads*</span>
                <span className="hero-metric-chip">-21 days sales cycle*</span>
                <span className="hero-metric-chip">Live demo in 30 min</span>
              </div>

              <div
                style={{ "--stagger-index": 4 } as React.CSSProperties}
                className="stagger-item mt-10 flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={scrollToDemo}
                  className="hero-primary-cta px-8 py-4 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-lg transition-colors text-base"
                >
                  See demo
                </button>
                <button
                  onClick={scrollToContact}
                  className="px-8 py-4 border border-white/20 hover:border-accent text-white font-medium rounded-lg transition-colors"
                >
                  Book a demo
                </button>
              </div>

              <button
                type="button"
                onClick={scrollToDemo}
                style={{ "--stagger-index": 5 } as React.CSSProperties}
                className="stagger-item hero-scroll-cue mt-10 text-xs text-gray-400 hover:text-white transition-colors"
              >
                Scroll to explore
              </button>
            </div>
          </ParallaxScene>

          <ParallaxScene distance={46} reverse>
            <div className="hero-media-shell relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-surface-light border border-white/5 group">
              <div className="hero-ring hero-ring-a" />
              <div className="hero-ring hero-ring-b" />
              <div className="hero-ring hero-ring-c" />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <button
                  onClick={scrollToDemo}
                  aria-label="See demo features"
                  className="hero-play-btn w-20 h-20 rounded-full bg-accent flex items-center justify-center hover:bg-accent-light transition-colors ml-1 group-hover:scale-105"
                >
                  <Play size={36} className="text-surface-dark" fill="currentColor" />
                </button>
              </div>
              <div className="hero-media-overlay z-[9]" />
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
                alt="Interactive archviz preview"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-50 z-0 pointer-events-none hero-media-image"
              />
              <div className="hero-float-panel hero-float-panel-a">
                Sun Study: 4:30 PM
              </div>
              <div className="hero-float-panel hero-float-panel-b">
                Unit 12B selected
              </div>
            </div>
          </ParallaxScene>
        </div>
      </div>
    </section>
  );
}
