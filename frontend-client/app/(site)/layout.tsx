import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { SectionProvider } from "@/app/contexts/SectionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "小李生活志",
  description: "分享生活点滴， 记录成长足迹",
  keywords: "生活, 记录, 成长, 分享",
  authors: [
    {
      name: "NING LI",
      url: "https://ningli.me",
    },
  ],
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
        <SectionProvider>
          <Header />
          <main className="h-screen flex container mx-auto px-4 py-8">
            {children}
          </main>

          <Footer />
        </SectionProvider>
      </AuthProvider>
    </>
  );
}
