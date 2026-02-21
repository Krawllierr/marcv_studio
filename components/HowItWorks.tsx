import { FileInput, Box, Cpu, Monitor } from "lucide-react";
import ParallaxScene from "./ParallaxScene";
import { CONTACT } from "@/lib/constants";

export default function HowItWorks() {
  const steps = [
    { icon: FileInput, title: "Plans" },
    { icon: Box, title: "3D model" },
    { icon: Cpu, title: "Unreal" },
    { icon: Monitor, title: "Delivery" },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <ParallaxScene distance={30} reverse>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-16">
            How it works
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 immersive-stagger">
            {steps.map((step, i) => (
              <div
                key={i}
                style={{ "--stagger-index": i } as React.CSSProperties}
                className="stagger-item flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-white">{step.title}</h3>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href={`mailto:${CONTACT.email}?subject=Spec%20Sheet%20Request`}
              className="text-accent hover:text-accent-light text-sm font-medium"
            >
              Request spec sheet
            </a>
          </div>

          <div className="mt-12 aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden bg-surface-dark/80 border border-white/5 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-gray-500 text-xs">Video</span>
              </div>
            </div>
          </div>
        </div>
      </ParallaxScene>
    </section>
  );
}
