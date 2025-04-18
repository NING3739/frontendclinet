import React from "react";

export const Logo = () => (
  <div className="flex items-center gap-2 group">
    <div className="w-8 h-8 rounded-br-full  bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
      <span className="text-amber-500"></span>
    </div>
    <span className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
      生活志
    </span>
  </div>
);
