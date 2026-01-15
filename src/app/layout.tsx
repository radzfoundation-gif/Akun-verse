import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ReferralProvider } from "@/contexts/ReferralContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { LoyaltyProvider } from "@/contexts/LoyaltyContext";
import CartDrawer from "@/components/CartDrawer";
import CookieConsent from "@/components/CookieConsent";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import FloatingChat from "@/components/FloatingChat";
import LoginModal from "@/components/LoginModal";
import ReferralListener from "@/components/ReferralListener";

import PromoPopup from "@/components/PromoPopup";
import Promo88Popup from "@/components/Promo88Popup";

// Midtrans configuration
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const SNAP_URL = IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://akunverse.com'),
  title: {
    default: 'Akunverse - Jual Beli Akun Game & Voucher Digital Termurah',
    template: '%s | Akunverse',
  },
  description: 'Platform jual beli akun game, voucher digital, top up game, dan software PC termurah dan terpercaya di Indonesia. Proses instan, aman, dan bergaransi.',
  keywords: [
    'jual akun game',
    'beli akun game',
    'voucher game murah',
    'top up game',
    'akun steam murah',
    'game digital',
    'voucher digital',
    'akunverse',
  ],
  authors: [{ name: 'Akunverse' }],
  creator: 'Akunverse',
  publisher: 'Akunverse',
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
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://akunverse.com',
    siteName: 'Akunverse',
    title: 'Akunverse - Jual Beli Akun Game & Voucher Digital Termurah',
    description: 'Platform jual beli akun game, voucher digital, top up game, dan software PC termurah dan terpercaya di Indonesia.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Akunverse - Platform Jual Beli Game Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akunverse - Jual Beli Akun Game & Voucher Digital Termurah',
    description: 'Platform jual beli akun game, voucher digital, top up game termurah di Indonesia.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        <head>
          {/* Midtrans Snap.js */}
          {MIDTRANS_CLIENT_KEY && (
            <Script
              src={SNAP_URL}
              data-client-key={MIDTRANS_CLIENT_KEY}
              strategy="lazyOnload"
            />
          )}
        </head>
        <body className={inter.className}>
          <CartProvider>
            <WishlistProvider>
              <ReferralProvider>
                <RecentlyViewedProvider>
                  <LoyaltyProvider>
                    <Suspense fallback={null}>
                      <ReferralListener />
                    </Suspense>
                    <UserSync />
                    <LoginModal />
                    <PromoPopup />
                    <Promo88Popup />
                    {children}
                    <FloatingChat />
                    <CartDrawer />
                    <CookieConsent />
                  </LoyaltyProvider>
                </RecentlyViewedProvider>
              </ReferralProvider>
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
