import type { Metadata } from "next";
import "@fontsource-variable/mona-sans";
import "./globals.css";
import { GsapProvider } from "@/components/providers/GsapProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/components/providers/StoreProvider";

export const metadata: Metadata = {
  title: "Clarity Finance | Take Control of Your Finances",
  description: "Master the art of public speaking, storytelling, and presentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="font-sans antialiased text-text-dark bg-bg-cream overflow-x-hidden">
        <StoreProvider>
          <GsapProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </GsapProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
