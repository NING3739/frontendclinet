import * as LucideIcons from "lucide-react";
import React from "react";

export const getIconComponent = (
  iconName: string
): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  if (!iconName) {
    return LucideIcons.Circle;
  }

  const formattedIconName = iconName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

  const icons = LucideIcons as unknown as {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  };

  if (formattedIconName in icons) {
    return icons[formattedIconName];
  }

  return LucideIcons.Circle;
};
