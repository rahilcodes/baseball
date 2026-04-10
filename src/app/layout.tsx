import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmergencyFAB } from "@/components/ui/EmergencyFAB";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bplbaseball.com"),
  title: {
    default: "Baseball Premier League (BPL) — Malaysia's First Adult Baseball League",
    template: "%s | BPL Baseball Malaysia",
  },
  description:
    "The Baseball Premier League (BPL) is Malaysia's first structured adult baseball league. Season 1 runs May–July 2026 in Selangor. Register as a player or sponsor today.",
  keywords: [
    "baseball malaysia", "baseball league malaysia", "adult baseball malaysia",
    "BPL baseball", "baseball premier league", "selangor baseball",
    "WBSC malaysia", "register baseball malaysia", "baseball season 2026",
  ],
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://www.bplbaseball.com",
    siteName: "Baseball Premier League Malaysia",
    title: "Baseball Premier League — Malaysia's First Adult Baseball League",
    description: "Season 1 | May–July 2026 | Selangor, Malaysia. Join the first structured adult baseball league in Malaysia.",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "BPL Baseball Malaysia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baseball Premier League Malaysia",
    description: "Season 1 | May–July 2026 | Selangor. Malaysia's first adult baseball league.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              name: "Baseball Premier League",
              alternateName: "BPL",
              url: "https://www.bplbaseball.com",
              logo: "https://www.bplbaseball.com/images/logo.png",
              description: "Malaysia's first structured adult baseball league. Season 1, May–July 2026, Selangor.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Selangor",
                addressCountry: "MY",
              },
              sport: "Baseball",
              event: {
                "@type": "SportsEvent",
                name: "BPL Season 1",
                startDate: "2026-05-04",
                endDate: "2026-07-31",
                location: { "@type": "Place", name: "Universiti Putra Malaysia (UPM)", addressLocality: "Selangor" },
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <EmergencyFAB />
      </body>
    </html>
  );
}
