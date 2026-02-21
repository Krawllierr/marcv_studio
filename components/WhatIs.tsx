import Image from "next/image";
import ParallaxScene from "./ParallaxScene";

export default function WhatIs() {
  const outcomes = [
    { title: "Shorter sales cycle", line: "Buyers get it faster.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600" },
    { title: "Sales gallery ready", line: "Touchscreen flow.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600" },
    { title: "One asset, multiple uses", line: "Showroom + marketing.", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600" },
  ];

  return (
    <section id="what-includes" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
      <ParallaxScene distance={28}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            What changes
          </h2>

          <div className="grid md:grid-cols-3 gap-6 immersive-stagger">
            {outcomes.map((card, i) => (
              <div
                key={i}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item group rounded-xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{card.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
