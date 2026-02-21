"use client";

import {
  Footprints,
  Sun,
  Images,
  TreePine,
  MapPin,
  Glasses,
} from "lucide-react";
import ParallaxScene from "./ParallaxScene";

export default function Features() {
  const features = [
    { icon: Footprints, title: "Walkthrough", line: "Free exploration" },
    { icon: Sun, title: "Sun study", line: "Real-time" },
    { icon: Images, title: "Interior gallery", line: "Unit views" },
    { icon: TreePine, title: "Amenities", line: "Common areas" },
    { icon: MapPin, title: "Location", line: "POIs" },
    { icon: Glasses, title: "VR", line: "Optional" },
  ];

  return (
    <section
      id="features"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.02]"
    >
      <ParallaxScene distance={32}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Features
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 immersive-stagger">
            {features.map((feature, i) => (
              <div
                key={i}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item flex gap-4 p-5 rounded-xl bg-surface-dark/50 border border-white/5 hover:border-accent/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-400">{feature.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
