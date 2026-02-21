import { TRUST_MARKS } from "@/lib/mock-data";
import ParallaxScene from "./ParallaxScene";

export default function ProofSocial() {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-white/5">
      <ParallaxScene distance={24}>
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 text-center mb-6">Selected partner profiles</p>
          <div className="grid md:grid-cols-3 gap-3 immersive-stagger">
            {TRUST_MARKS.map((mark, i) => (
              <article
                key={mark.name}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item rounded-lg border border-white/10 bg-surface-light/30 px-4 py-3"
              >
                <p className="text-white text-sm font-semibold">{mark.name}</p>
                <p className="text-xs text-gray-400 mt-1">{mark.segment}</p>
                <p className="text-xs text-accent mt-2">{mark.proof}</p>
              </article>
            ))}
          </div>
          <p className="text-[11px] text-gray-500 mt-4 text-center">Preview data (mocked).</p>
        </div>
      </ParallaxScene>
    </section>
  );
}
