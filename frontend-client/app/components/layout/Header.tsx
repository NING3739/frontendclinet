"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSection } from "@/app/hooks/useSection";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useAuth } from "@/app/hooks/useAuth";
import { Logo } from "../ui/Logo";
import { userProfileService } from "@/app/services/userProfileService";

export default function Header() {
  const { sections, error } = useSection();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();

  interface User {
    name: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    setAuthChecked(true);
    // Check if the user is authenticated
    if (isAuthenticated) {
      handleUserProfile();
    }
  }, [isAuthenticated]);

  const handleUserProfile = async () => {
    if (isAuthenticated) {
      try {
        const response = await userProfileService.showMyProfile();
        console.log("User profile response:", response);
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
        console.error("Error fetching user profile:", error);
      }
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="flex space-x-4">
            {sections &&
              sections.map((section) => (
                <Link
                  key={section.id}
                  href={`/${section.slug}`}
                  className="px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  {section.name[language]}
                </Link>
              ))}
          </div>

          <div>
            {isAuthenticated ? (
              // show user profile
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  {user ? user.name : "用户"}
                </Link>
                <Link
                  href="/logout"
                  className="px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  登出
                </Link>
              </div>
            ) : (
              // show login button
              <Link
                href="/login"
                className="px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
              >
                登录
              </Link>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </nav>
      </div>
    </header>
  );
}
