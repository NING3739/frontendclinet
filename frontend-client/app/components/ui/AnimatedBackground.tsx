"use client";

import { motion } from "motion/react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 动画背景 */}
      <motion.div
        className="absolute inset-0 bg-blue-50"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05, rotate: 3 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* 第一个动画圆形 */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-teal-300 rounded-full opacity-20"
        animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 第二个动画圆形 */}
      <motion.div
        className="absolute bottom-10 left-1/3 w-80 h-80 bg-teal-400 rounded-full opacity-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 第三个动画圆形 */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal-200 rounded-full opacity-25"
        animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 第四个动画圆形 */}
      <motion.div
        className="absolute bottom-1/4 right-10 w-72 h-72 bg-teal-500 rounded-full opacity-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
