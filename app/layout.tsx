import type { Metadata } from "next";
import "./globals.css";
import "./portfolio-extra.css";
import "./mobile-reference.css";
import "./accessibility.css";
import "./motion-control.css";
import "./header-reference.css";

export const metadata: Metadata = {
  title: "Chamidu Deshan | Digital Marketer",
  description:
    "Portfolio of Chamidu Deshan, a digital marketer working across social media, paid advertising, content strategy, and brand development.",
  keywords: [
    "Chamidu Deshan",
    "digital marketer",
    "social media marketing",
    "paid advertising",
    "content strategy",
    "brand development",
    "Sri Lanka",
  ],
  verification: {
    google: "KUL4_VMtrIrdifIuUSKOZpdKwfXX9jTMXmXpX9cEjwE",
  },
  openGraph: {
    title: "Chamidu Deshan | Digital Marketer",
    description:
      "Social media, paid advertising, content strategy, and brand development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
