import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display, Space_Mono, Permanent_Marker } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from "../components/ui/providers/ThemeProvider";
import { LayoutProvider } from "../components/ui/providers/LayoutProvider";
import { NavigationProvider } from "../components/ui/providers/NavigationProvider";
import NavBar from "../components/ui/layout/NavBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Rohan Luthra',
    default: 'Rohan Luthra'
  },
  description: 'Personal website of Rohan Luthra',
  keywords: [],
  authors: [{ name: 'Rohan' }],
  creator: 'Rohan',
  metadataBase: new URL('https://www.rohanluthra.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rohanluthra.com',
    title: 'Rohan Luthra',
    description: 'Personal website of Rohan Luthra.',
    siteName: 'Rohan',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Rohan Luthra',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan Luthra',
    description: 'Personal website of Rohan Luthra',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Prevent ethereum-related errors on mobile
            if (typeof window !== 'undefined' && !window.ethereum) {
              window.ethereum = {
                selectedAddress: undefined,
                isMetaMask: false,
                request: () => Promise.reject(new Error('No Web3 provider available')),
                on: () => {},
                removeListener: () => {}
              };
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} ${spaceMono.variable} ${permanentMarker.variable} antialiased`}
      >
        <ThemeProvider>
          <LayoutProvider>
            <NavigationProvider>
              <NavBar />
              {children}
            </NavigationProvider>
          </LayoutProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
