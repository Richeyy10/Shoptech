import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/fonts.css';
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
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
    // <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SignedOut>
          <SignIn routing="hash"></SignIn>
        </SignedOut>
        <SignedIn>
        <Providers>
          <AppContextProvider>
            {children}
          </AppContextProvider>
          </Providers>
        </SignedIn>
      </body>
    </html>
    // </ClerkProvider>
  );
}
