import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ScrollImmersion from "@/components/ScrollImmersion";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function resolveMetadataBase() {
  const fallback = "https://marcvstudio.com";
  const candidate = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  try {
    return new URL(candidate);
  } catch {
    return new URL(fallback);
  }
}

const metadataBase = resolveMetadataBase();

export const metadata: Metadata = {
  metadataBase,
  title: "MarcV Studio | Interactive Unreal Engine Archviz for Sales Galleries",
  description:
    "Sell properties before they're built. T.VYZ is an interactive Unreal Engine platform for real estate sales galleries — walkthrough, sun study, unit selection. Book a demo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MarcV Studio | Interactive Archviz for Sales Galleries",
    description:
      "Sell properties before they're built. Interactive Unreal Engine experiences for developers and sales teams.",
    url: "/",
    siteName: "MarcV Studio",
    type: "website",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "MarcV Studio T.VYZ preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MarcV Studio | Interactive Archviz for Sales Galleries",
    description:
      "Sell properties before they're built. Interactive Unreal Engine experiences for developers and sales teams.",
    images: ["/og-default.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body suppressHydrationWarning className="font-sans antialiased overflow-x-hidden">
        <ScrollImmersion />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCTA />
        </div>
      </body>
    </html>
  );
}
