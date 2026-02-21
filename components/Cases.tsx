import Image from "next/image";
import { Play } from "lucide-react";
import { CASE_STUDIES } from "@/lib/mock-data";
import ParallaxScene from "./ParallaxScene";

export default function Cases() {
  const featuredCase = CASE_STUDIES[0];

  return (
    <section id="case" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
          Projects
        </h2>

        <ParallaxScene distance={36}>
          <div className="immersive-stagger">
            <article
              style={{ "--stagger-index": 0 } as React.CSSProperties}
              className="stagger-item aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden bg-surface-dark/80 border border-white/5 relative group"
            >
            <Image
              src={featuredCase.image}
              alt={`${featuredCase.title} in ${featuredCase.city}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/40 px-3 py-1 text-xs text-accent">
                <Play size={12} fill="currentColor" />
                Featured case
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl text-white font-semibold">{featuredCase.title}</h3>
              <p className="text-sm text-gray-300 mt-1">
                {featuredCase.city} - {featuredCase.units} units
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">{featuredCase.leadLift}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-white">{featuredCase.salesCycle}</span>
              </div>
              <a
                href="#contact"
                className="inline-flex mt-4 text-sm text-accent hover:text-accent-light transition-colors"
              >
                See this workflow in a live demo
              </a>
            </div>
            </article>
          </div>
        </ParallaxScene>

        <ParallaxScene distance={26} reverse>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 immersive-stagger">
            {CASE_STUDIES.map((item, i) => (
              <article
                key={item.title}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item aspect-[4/3] rounded-lg overflow-hidden bg-surface-light/50 border border-white/5 relative"
              >
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.city}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[11px] text-white/90 truncate">{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </ParallaxScene>
        <p className="mt-4 text-[11px] text-gray-500 text-center">Case metrics shown as mock preview data.</p>
      </div>
    </section>
  );
}
