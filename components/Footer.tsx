import Link from "next/link";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";
import { CONTACT, LEGAL } from "@/lib/constants";
import LeadMagnetTrigger from "./LeadMagnetTrigger";

export default function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-white">MarcV Studio</span>
              <span className="text-accent font-semibold">T.VYZ</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              Interactive Unreal Archviz for sales galleries.
            </p>
            <div className="mt-4">
              <LeadMagnetTrigger />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={16} />
              {CONTACT.email}
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Phone size={16} />
              {CONTACT.phone}
            </a>
            <div className="flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href={LEGAL.privacyHref} className="hover:text-gray-400 transition-colors">
              Privacy
            </Link>
            <Link href={LEGAL.termsHref} className="hover:text-gray-400 transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MarcV Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
