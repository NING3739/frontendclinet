"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import AnimatedBackground from "@/app/components/ui/AnimatedBackground";

export default function NotFoundPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden"
      >
        <AnimatedBackground />

        {/* Not Found Content */}
        <div className="text-center relative z-10">
          <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-8">
            抱歉，我们找不到您访问的页面。
          </p>
          <Link
            href="/"
            className="inline-block py-3 px-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            返回首页
          </Link>
        </div>
      </motion.div>
    </>
  );
}
