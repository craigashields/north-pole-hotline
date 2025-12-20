import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "North Pole Hotline",
  description: "A magical Christmas hotline UI to call Santa from your phone.",
  applicationName: "North Pole Hotline",
  keywords: ["Santa", "Christmas", "Hotline", "Phone UI", "Festive"],
  authors: [{ name: "North Pole Hotline" }],
  openGraph: {
    title: "North Pole Hotline",
    description: "Ring the North Pole with a festive phone experience.",
  },
  twitter: {
    card: "summary",
    title: "North Pole Hotline",
    description: "Ring the North Pole with a festive phone experience.",
  },
  icons: {
    icon: "favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
