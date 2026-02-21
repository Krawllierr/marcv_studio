import { Building2, Map, Briefcase } from "lucide-react";
import ParallaxScene from "./ParallaxScene";

export default function WhoIsFor() {
  const useCases = [
    { icon: Building2, title: "Boutique developer", line: "Sales Suite fit" },
    { icon: Map, title: "Master planned", line: "Pro" },
    { icon: Briefcase, title: "Marketing agency", line: "Launch MVP" },
  ];

  return (
    <section id="who-its-for" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <ParallaxScene distance={28} reverse>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Who it&apos;s for
          </h2>

          <div className="grid md:grid-cols-3 gap-6 immersive-stagger">
            {useCases.map((uc, i) => (
              <div
                key={i}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item p-6 rounded-xl bg-surface-light/50 border border-white/5 hover:border-accent/20 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <uc.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-white">{uc.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{uc.line}</p>
              </div>
            ))}
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
