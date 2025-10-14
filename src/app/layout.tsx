import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/fonts.css';
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shoptech",
  description: "A technology e-commerce website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <AppContextProvider>
            {children}
          </AppContextProvider>
          </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
