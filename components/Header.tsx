"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkHref = (href: string) => (isHome ? href : `/${href}`);

  const handleBookDemo = () => {
    if (isHome) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-dark/90 backdrop-blur-md border-b border-white/5 py-2"
          : "bg-surface-dark/95 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all ${
            scrolled ? "h-14" : "h-16 lg:h-20"
          }`}
        >
          <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
            <span className="text-xl font-bold text-white">MarcV Studio</span>
            <span className="text-accent font-semibold">T.VYZ</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={linkHref(link.href)}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {isHome ? (
              <button
                onClick={handleBookDemo}
                className="hidden md:inline-flex px-5 py-2.5 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-lg transition-all hover:shadow-md hover:shadow-accent/20 active:scale-[0.98]"
              >
                Book a demo
              </button>
            ) : (
              <Link
                href="/#contact"
                className="hidden md:inline-flex px-5 py-2.5 bg-accent hover:bg-accent-light text-surface-dark font-semibold rounded-lg transition-all hover:shadow-md hover:shadow-accent/20 active:scale-[0.98]"
              >
                Book a demo
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-white/5">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={linkHref(link.href)}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileOpen(false)}
                className="text-left px-5 py-2.5 bg-accent text-surface-dark font-semibold rounded-lg w-fit"
              >
                Book a demo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
