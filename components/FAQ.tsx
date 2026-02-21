"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ParallaxScene from "./ParallaxScene";

const FAQ_ITEMS = [
  { q: "What do you need?", a: "Plans, references, timeline." },
  { q: "What hardware?", a: "Touchscreen 55\" or 32\". Capable PC. Spec sheet available." },
  { q: "How long?", a: "MVP: 30 days. Suite: 45–60 days. Pro: 8–12 weeks." },
  { q: "VR support?", a: "Yes. Optional add-on or in Pro." },
  { q: "Sales team use?", a: "Yes. Touchscreen stands. Training included." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
      <ParallaxScene distance={24}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            FAQ
          </h2>

          <div className="space-y-2 immersive-stagger">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item border border-white/5 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-white font-medium hover:bg-white/5 transition-colors"
                >
                  {item.q}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 py-3 bg-surface-dark/30 text-gray-400 text-sm border-t border-white/5">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
