"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FloatingCTA() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) {
    return (
      <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
        <Link
          href="/#contact"
          className="inline-flex px-6 py-3 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all active:scale-[0.98] backdrop-blur-sm border border-white/10"
        >
          Book a demo
        </Link>
      </div>
    );
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 hidden lg:flex lg:items-center lg:justify-end">
      <button
        onClick={scrollToContact}
        className="px-6 py-3 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all active:scale-[0.98] backdrop-blur-sm border border-white/10"
      >
        Book a demo
      </button>
    </div>
  );
}
