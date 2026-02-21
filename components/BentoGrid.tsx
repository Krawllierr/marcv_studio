"use client";

import { Play, LayoutGrid, Sun, TreePine, MapPin } from "lucide-react";
import ParallaxScene from "./ParallaxScene";

const BENTO_ITEMS = [
  { title: "Unit selector", icon: LayoutGrid },
  { title: "Sun study", icon: Sun },
  { title: "Amenities", icon: TreePine },
  { title: "POIs", icon: MapPin },
];

export default function BentoGrid() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
      <ParallaxScene distance={30} reverse>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            The system in action
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 immersive-stagger">
            {BENTO_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={scrollToFeatures}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item group relative aspect-video rounded-xl overflow-hidden bg-surface-dark/80 border border-white/5 hover:border-accent/30 transition-all hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-2">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium text-white text-sm">{item.title}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Play size={16} className="text-surface-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
