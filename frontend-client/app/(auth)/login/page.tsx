"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "@/app/hooks/useAuth";
import { FormHeader } from "@/app/components/ui/FormHeader";
import { LoginForm } from "@/app/components/auth/LogInForm";
import { SocialLoginButtons } from "@/app/components/ui/SocilaLoginButton";
import { LogInPayload } from "@/app/types/authType";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useGetText } from "@/app/lib/utils/i18n";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LogInPayload>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;
    await login({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { language } = useLanguage();
  const getText = useGetText(language);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden"
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-10 relative z-10">
        <FormHeader type="login" />
        <LoginForm
          handleLogin={handleLogin}
          formData={formData}
          handleInputChange={handleInputChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-base text-gray-500 bg-white">
              {getText("loginWithSocialMedia")}
            </span>
          </div>
        </div>
        <SocialLoginButtons />
      </div>
    </motion.div>
  );
};

export default LoginPage;
