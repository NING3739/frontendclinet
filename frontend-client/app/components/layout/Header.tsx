"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  LogOut,
  UserCircle2,
  LogIn,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  Heart,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useSection } from "@/app/hooks/useSection";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useAuth } from "@/app/hooks/useAuth";
import { Logo } from "@/app/components/ui/Logo";
import { useGetText } from "@/app/lib/utils/i18n";
import { userProfileService } from "@/app/services/userProfileService";
import { UnderlineHover } from "@/app/components/ui/UnderlineHover";

export default function Header() {
  const { sections } = useSection();
  const { language } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const getText = useGetText(language);
  const [user, setUser] = useState<{
    name: string;
    avatar: string;
    email: string;
  } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fetch user data and handle outside clicks
  useEffect(() => {
    // Fetch user profile when authenticated
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await userProfileService.showMyProfile();
          setUser({
            name: response.data.name,
            avatar: response.data.avatar,
            email: response.data.email,
          });
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserProfile();

    // Handle clicks outside dropdowns
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("#mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle scroll for header appearance
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAuthenticated]);

  // Helper to capitalize first letter
  const capitalize = (text: string) =>
    language === "english"
      ? text.charAt(0).toUpperCase() + text.slice(1)
      : text;

  // Helper to get icon component
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    const pascal = iconName
      .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
      .replace(/^(.)/, (_, c) => c.toUpperCase());
    return (LucideIcons as any)[pascal] as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;
  };

  // Avatar URL
  const avatarUrl =
    typeof user?.avatar === "string" && user?.avatar.startsWith("http")
      ? user.avatar
      : "/default_avatar.png";

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const searchVariants = {};

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center transition-opacity hover:opacity-80"
            >
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {sections?.map((section) => (
                <div key={section.id} className="relative group">
                  <Link
                    href={`/${section.slug}`}
                    className="flex items-center gap-1.5 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {getIconComponent(section.icon) &&
                      React.createElement(
                        getIconComponent(section.icon) as React.ElementType,
                        { className: "w-4 h-4" }
                      )}
                    <span className="font-medium">
                      {capitalize(section.name[language])}
                    </span>

                    {section.children && section.children.length > 0 && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {section.children && section.children.length > 0 && (
                    <div className="absolute left-0 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="w-56 bg-white rounded-md shadow-lg border border-gray-100 py-1 overflow-hidden">
                        {section.children?.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/${section.slug}/${child.slug}`}
                            className="flex items-center gap-2 px-4 py-2 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                          >
                            {getIconComponent(child.icon) &&
                              React.createElement(
                                getIconComponent(
                                  child.icon
                                ) as React.ElementType,
                                { className: "w-4 h-4 text-gray-500" }
                              )}
                            <span>
                              <UnderlineHover>
                                {capitalize(child.name[language])}
                              </UnderlineHover>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side - User Menu & Actions */}
            <div className="flex items-center gap-2">
              {/* User Menu - Only visible on desktop (md+) */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-1 p-1.5 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                      aria-expanded={isUserMenuOpen}
                    >
                      <div className="relative flex-shrink-0">
                        <Image
                          src={avatarUrl}
                          alt={user?.name || "User"}
                          width={32}
                          height={32}
                          className="rounded-md object-cover border border-gray-200"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                      </div>
                    </button>

                    {/* User Dropdown */}
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <Image
                                src={avatarUrl}
                                alt={user?.name || "User"}
                                width={48}
                                height={48}
                                className="rounded-md object-cover border border-gray-200"
                              />
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {user?.name ? capitalize(user.name) : ""}
                                </h4>
                                <p className=" text-gray-500 text-sm">
                                  {user?.email ? user.email : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="py-1">
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-2 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <UserCircle2 className="w-4 h-4" />
                              <span>{getText("profile") || "Profile"}</span>
                            </Link>
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-4 py-2 text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              <span>{getText("dashboard") || "Dashboard"}</span>
                            </Link>
                            <Link
                              href="/settings"
                              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" />
                              <span>{getText("settings")}</span>
                            </Link>
                            <div className="border-t border-gray-100 mx-4 my-1"></div>
                            <button
                              onClick={() => {
                                logout();
                                setIsUserMenuOpen(false);
                              }}
                              className="flex items-center gap-3 px-4 py-2 w-full text-left text-base text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-all"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>{getText("logout")}</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-md hover:text-blue-600 transition-colors bg-blue-50 border border-transparent hover:border-blue-100"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{getText("login")}</span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-button"
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMobileMenuOpen ? "close" : "menu"}
                    initial={{
                      opacity: 0,
                      rotate: isMobileMenuOpen ? -90 : 90,
                    }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto pt-16"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Nav Items */}
              <div className="space-y-4">
                {sections?.map((section) => (
                  <div key={section.id} className="mb-4">
                    <Link
                      href={`/${section.slug}`}
                      className="flex items-center justify-between py-3 text-base font-medium text-gray-800"
                      onClick={() =>
                        section.children?.length
                          ? null
                          : setIsMobileMenuOpen(false)
                      }
                    >
                      <div className="flex items-center gap-3">
                        {getIconComponent(section.icon) &&
                          React.createElement(
                            getIconComponent(section.icon) as React.ElementType,
                            { className: "w-5 h-5 text-blue-600" }
                          )}
                        <span>
                          <UnderlineHover>
                            {capitalize(section.name[language])}
                          </UnderlineHover>
                        </span>
                      </div>
                      {section.children && section.children.length > 0 && (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </Link>

                    {/* Sub Items */}
                    {section.children && section.children.length > 0 && (
                      <div className="mt-2 pl-8 space-y-2 border-l-2 border-gray-100">
                        {section.children?.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/${section.slug}/${child.slug}`}
                            className="flex items-center gap-2 py-2 text-base text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {getIconComponent(child.icon) &&
                              React.createElement(
                                getIconComponent(
                                  child.icon
                                ) as React.ElementType,
                                { className: "w-4 h-4 text-gray-500" }
                              )}
                            <span>
                              <UnderlineHover>
                                {capitalize(child.name[language])}
                              </UnderlineHover>
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Divider except for last item */}
                    {sections &&
                      sections.indexOf(section) < sections.length - 1 && (
                        <div className="border-b border-gray-100 my-4"></div>
                      )}
                  </div>
                ))}
              </div>

              {/* Mobile User Actions */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                {isAuthenticated ? (
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Image
                        src={avatarUrl}
                        alt={user?.name || "User"}
                        width={48}
                        height={48}
                        className="rounded-md object-cover border border-gray-200"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {user?.name ? capitalize(user.name) : ""}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {user?.email ? user.email : ""}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 py-2 text-base text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserCircle2 className="w-5 h-5" />
                        <span>{getText("profile")}</span>
                      </Link>
                      <Link
                        href="/dashboard"
                        target="_blank"
                        className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>{getText("dashboard")}</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span>{getText("settings")}</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 py-2 w-full text-left text-base text-red-500 hover:text-red-600 hover:bg-red-50/50 transition-colors"
                      >
                        <LogOut className="w-5 h-5 text-red-500" />
                        <span>{getText("logout")}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-base text-center transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="font-medium">{getText("login")}</span>
                  </Link>
                )}
              </div>

              {/* Mobile Footer */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Heart className="w-4 h-4 text-pink-300" />
                  <span>{getText("tagline") || "Welcome to my blog"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
