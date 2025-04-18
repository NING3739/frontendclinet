import "@/app/globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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

async function getLangFromHeader(): Promise<"en" | "zh-CN"> {
  const headerData = await headers();
  const acceptLang = headerData.get("accept-language");
  if (acceptLang?.startsWith("en")) {
    return "en";
  } else if (acceptLang?.startsWith("zh")) {
    return "zh-CN";
  } else {
    return "zh-CN";
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLangFromHeader();

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
