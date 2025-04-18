"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, LucideIcon } from "lucide-react";
import { UnderlineHover } from "@/app/components/ui/UnderlineHover";

interface CustomLinkProps {
  href: string;
  icon?: LucideIcon;
  external?: boolean;
  children: React.ReactNode;
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  icon: Icon,
  external,
  children,
}) => {
  const classes =
    "flex items-center gap-2 px-4 py-2 text-base text-gray-600 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50";

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>
        <UnderlineHover>{children}</UnderlineHover>
      </span>
      <ExternalLink className="w-4 h-4" />
    </a>
  ) : (
    <Link href={href} className={classes}>
      {Icon && <Icon className="w-5 h-5" />}
      <span>
        <UnderlineHover>{children}</UnderlineHover>
      </span>
    </Link>
  );
};
