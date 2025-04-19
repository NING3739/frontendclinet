import { useCallback } from "react";

export type Language = "english" | "chinese";

export const translations: Record<string, Record<Language, string>> = {
  login: { english: "Login", chinese: "登录" },
  loginAccount: {
    english: "Login Account",
    chinese: "登录账号",
  },
  register: { english: "Register", chinese: "注册" },
  registerAccount: {
    english: "Register Account",
    chinese: "注册账号",
  },
  noAccount: {
    english: "No account yet?",
    chinese: "还没有账号？",
  },
  registerNow: {
    english: "Register Now",
    chinese: "注册账号",
  },
  alreadyHaveAccount: {
    english: "Have an account?",
    chinese: "已有账号？",
  },
  loginNow: {
    english: "Login Now",
    chinese: "立即登录",
  },
  isRememberPassword: {
    english: "Remember Password?",
    chinese: "记得密码？",
  },
  forgotPassword: {
    english: "Forgot Password?",
    chinese: "忘记密码？",
  },
  resetPassword: {
    english: "Reset Password",
    chinese: "重置密码",
  },
  loginWithSocialMedia: {
    english: "Or Login with Social Media",
    chinese: "或使用社交账号登录",
  },
  inputEmail: {
    english: "Please input your email",
    chinese: "输入邮箱",
  },
  inputCode: {
    english: "Please input the code",
    chinese: "输入验证码",
  },
  getConfirmCode: {
    english: "Code",
    chinese: "获取验证码",
  },
  inputUsername: {
    english: "Please input your username",
    chinese: "请输入用户名",
  },
  inputPassword: {
    english: "Please input your password",
    chinese: "请输入密码",
  },
  inputConfirmPassword: {
    english: "Please input your confirm password",
    chinese: "请输入确认密码",
  },
  alreadysendCode: {
    english: "✔️Sent",
    chinese: "✔️ 已发送",
  },
  resendCode: {
    english: "Resend Code",
    chinese: "重新发送",
  },
  isRegistering: {
    english: "Registering...",
    chinese: "注册中...",
  },
  isRedirecting: {
    english: "Redirecting...",
    chinese: "正在跳转...",
  },
  // Forget Password Page
  title: {
    english: "Forget Password | Little Li's Life Diary",
    chinese: "忘记密码 | 小李生活志",
  },
  description: {
    english: "Forget password? Reset password and login again",
    chinese: "忘记密码？重置密码，重新登录小李生活志",
  },
  keywords: {
    english: "Forget password, Reset password, Little Li's Life Diary",
    chinese: "忘记密码, 重置密码, 小李生活志",
  },
  // Header
  logout: {
    english: "Logout",
    chinese: "登出",
  },
  settings: {
    english: "Settings",
    chinese: "设置",
  },
  dashboard: {
    english: "Dashboard",
    chinese: "仪表盘",
  },
  profile: {
    english: "Profile",
    chinese: "个人资料",
  },

  // Footer
  tagline: {
    english: "Recording beautiful life with heart",
    chinese: "用心记录美好生活",
  },
  journey: { english: "Blog Journey", chinese: "博客历程" },
  sitemap: { english: "Sitemap", chinese: "网站地图" },
  copyright: { english: "Copyright ©", chinese: "版权所有 ©" },
  icp: { english: "ICP License xxxxxx", chinese: "京ICP备xxxxxx号" },
  made: { english: "Made with", chinese: "创建于" },
  in: { english: "in Auckland", chinese: "奥克兰" },
  switchToEnglish: { english: "Switch to English", chinese: "切换为英文" },
  switchToChinese: { english: "Switch to Chinese", chinese: "切换为中文" },
  aboutMe: { english: "About Me", chinese: "关于博主" },
};

export function getText(key: string, language: Language): string {
  return translations[key]?.[language] || key;
}

export function useGetText(language: Language) {
  return useCallback((key: string) => getText(key, language), [language]);
}
