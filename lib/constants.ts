export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#who-its-for", label: "Who it's for" },
  { href: "#packages", label: "Packages" },
  { href: "#case", label: "Case" },
  { href: "#contact", label: "Contact" },
] as const;

export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
export const LEAD_MAGNET_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_MAGNET_ENDPOINT || "";

export const CONTACT = {
  email: "marcv_studio.3d@outlook.com",
  phone: "+1 (305) 555-0199",
  instagram: "https://instagram.com/marcv_studio.3d",
  linkedin: "https://linkedin.com/company/marcv-studio",
} as const;

export const LEGAL = {
  privacyHref: "/privacy",
  termsHref: "/terms",
} as const;
