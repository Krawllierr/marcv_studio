"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import ProposalModal from "./ProposalModal";
import ParallaxScene from "./ParallaxScene";

export default function Packages() {
  const [modalPackage, setModalPackage] = useState<string | null>(null);

  const packages = [
    {
      name: "Launch MVP",
      popular: false,
      features: ["1 unit", "Walkthrough", "1 video", "Hardware checklist"],
    },
    {
      name: "Sales Suite",
      popular: true,
      features: ["Unit selector", "Sun study", "Map/POIs", "Team training"],
    },
    {
      name: "Pro",
      popular: false,
      features: ["Multi typologies", "Configurator", "VR", "Multi-device"],
    },
  ];

  const comparisonFeatures = [
    { name: "Unit selection", mvp: true, suite: true, pro: true },
    { name: "Sun study", mvp: false, suite: true, pro: true },
    { name: "Map / POIs", mvp: false, suite: true, pro: true },
    { name: "Team training", mvp: false, suite: true, pro: true },
    { name: "VR", mvp: false, suite: false, pro: true },
  ];

  return (
    <section
      id="packages"
      className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white/[0.02]"
    >
      <ParallaxScene distance={34}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-6 immersive-stagger">
            {packages.map((pkg, i) => (
              <div
                key={i}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className={`relative rounded-xl border p-6 transition-all ${
                  pkg.popular
                    ? "bg-accent/10 border-accent"
                    : "bg-surface-dark/50 border-white/5 hover:border-accent/20"
                } stagger-item`}
              >
                {pkg.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent text-surface-dark text-xs font-semibold rounded-full">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setModalPackage(pkg.name)}
                  className={`mt-6 w-full py-3 rounded-lg font-semibold transition-all ${
                    pkg.popular
                      ? "bg-accent text-surface-dark hover:bg-accent-light"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Book a demo
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 overflow-x-auto immersive-stagger">
            <table className="w-full min-w-[400px] text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 text-gray-400 font-medium">Feature</th>
                  <th className="text-center py-3 text-white font-medium">MVP</th>
                  <th className="text-center py-3 text-white font-medium">Suite</th>
                  <th className="text-center py-3 text-white font-medium">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={i}
                    style={{ "--stagger-index": i } as React.CSSProperties}
                    className="border-b border-white/5 stagger-item"
                  >
                    <td className="py-3 text-gray-400">{row.name}</td>
                    <td className="py-3 text-center">
                      {row.mvp ? <Check className="w-4 h-4 text-accent mx-auto" /> : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="py-3 text-center">
                      {row.suite ? <Check className="w-4 h-4 text-accent mx-auto" /> : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="py-3 text-center">
                      {row.pro ? <Check className="w-4 h-4 text-accent mx-auto" /> : <span className="text-gray-600">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-lg transition-colors"
            >
              Book a demo
            </button>
          </div>
        </div>
      </ParallaxScene>

      {modalPackage && (
        <ProposalModal
          isOpen={!!modalPackage}
          onClose={() => setModalPackage(null)}
          packageName={modalPackage}
        />
      )}
    </section>
  );
}
