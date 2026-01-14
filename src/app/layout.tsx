import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import FloatingChat from "@/components/FloatingChat";
import LoginModal from "@/components/LoginModal";

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
  title: "Akunverse - Game Steam Murah",
  description: "Platform jual beli game termurah dan terpercaya di Indonesia.",
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
            <UserSync />
            <LoginModal />
            <PromoPopup />
            <Promo88Popup />
            {children}
            <FloatingChat />
            <CartDrawer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
