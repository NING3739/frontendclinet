"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { FormHeader } from "@/app/components/ui/FormHeader";
import { ResetPasswordForm } from "@/app/components/auth/ForgotPassword";
import { EmailPayload, ResetPasswordPayload } from "@/app/types/authType";
import { authService } from "@/app/services/authService";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ResetPasswordPayload>({
    email: "",
    code: "",
    password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);
  const handleSendRestPasswordCode = async (payload: EmailPayload) => {
    setIsSendingCode(true);
    try {
      await authService.sendResetPasswordCode(payload);
      setIsCodeSent(true);
      setCountdown(60);
    } catch (error: any) {
      console.error("发送验证码失败", error);
    } finally {
      setIsSendingCode(false);
    }
  };
  const handleRestPassword = async (payload: ResetPasswordPayload) => {
    setIsSubmitting(true);
    try {
      const response = await authService.resetPassword(payload);
      if (response.success) {
        console.log("密码重置成功");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("注册失败", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden"
    >
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-10 relative z-10">
        <FormHeader type="reset" />

        <ResetPasswordForm
          handleRestPassword={handleRestPassword}
          formData={formData}
          handleInputChange={handleInputChange}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
          showConfirmPassword={showConfirmPassword}
          toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          isSubmitting={isSubmitting}
          isCodeSent={isCodeSent}
          countdown={countdown}
          isSendingCode={isSendingCode}
          handleSendRestPasswordCode={handleSendRestPasswordCode}
        />
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
