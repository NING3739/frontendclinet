"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Heart,
  Map,
  UserCircle2,
  History,
  ExternalLink,
  Globe,
  LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useGetText } from "@/app/lib/utils/i18n";
import { Logo } from "@/app/components/ui/Logo";
import { UnderlineHover } from "@/app/components/ui/UnderlineHover";
import { CustomLink } from "@/app/components/ui/CustomLink";

const Footer = () => {
  const { language, setLanguage } = useLanguage();
  const getText = useGetText(language);
  const currentYear = new Date().getFullYear();

  // 获取当前语言对应的切换文本键
  const switchLanguageKey =
    language === "english" ? "switchToChinese" : "switchToEnglish";

  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-blue-50 to-white border-t border-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,rgba(59,130,246,0.04),transparent)] pointer-events-none" />
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Link href="/">
                <Logo />
              </Link>
              <div className="flex items-center gap-2 px-5 py-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <Heart className="w-5 h-5 text-pink-300" />
                <span className="text-base text-gray-600">
                  {getText("tagline")}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <CustomLink href="/about" icon={UserCircle2}>
                {getText("aboutMe")}
              </CustomLink>
              <CustomLink href="/blog-journey" icon={History}>
                {getText("journey")}
              </CustomLink>
              <CustomLink href="/sitemap" icon={Map}>
                {getText("sitemap")}
              </CustomLink>

              {/* Language Switcher */}
              <button
                onClick={() =>
                  setLanguage(language === "english" ? "chinese" : "english")
                }
                className="flex items-center gap-2 px-4 py-2 text-base text-gray-600 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 border border-transparent hover:border-blue-100"
              >
                <Globe className="w-5 h-5" />
                <span>
                  <UnderlineHover>{getText(switchLanguageKey)}</UnderlineHover>
                </span>
              </button>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-blue-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-base text-gray-500">
                <span>{`${getText(
                  "copyright"
                )} ${currentYear} 小李生活志`}</span>
                <CustomLink href="https://beian.miit.gov.cn/" external={true}>
                  {getText("icp")}
                </CustomLink>
              </div>
              <div className="flex items-center gap-2 px-5 py-3 text-base text-gray-500 rounded-lg bg-blue-50/50">
                <span>{getText("made")}</span>
                <Heart className="w-4 h-4 text-pink-300" />
                <span>{getText("in")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
