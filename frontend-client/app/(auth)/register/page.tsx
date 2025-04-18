"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { RegisterForm } from "@/app/components/auth/RegisterForm";
import { FormHeader } from "@/app/components/ui/FormHeader";
import { authService } from "@/app/services/authService";
import { RegisterPayload, EmailPayload } from "@/app/types/authType";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterPayload>({
    email: "",
    password: "",
    code: "",
    confirm_password: "",
    name: "",
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

  const handleSendCode = async (payload: EmailPayload) => {
    setIsSendingCode(true);
    try {
      await authService.sendVerificationCode(payload);
      setIsCodeSent(true);
      setCountdown(60);
    } catch (error: any) {
      console.error("发送验证码失败", error);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleRegister = async (payload: RegisterPayload) => {
    setIsSubmitting(true);
    try {
      const response = await authService.emailRegisterAccount(payload);
      if (response.success) {
        console.log("注册成功");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("注册失败", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center px-6 py-8 relative overflow-hidden"
      >
        {/* 注册表单容器 */}
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-10 relative z-10">
          <FormHeader type="register" />

          {/* 注册表单 */}
          <RegisterForm
            formData={formData}
            handleInputChange={handleInputChange}
            isCodeSent={isCodeSent}
            isSendingCode={isSendingCode}
            handleSendCode={handleSendCode}
            handleRegister={handleRegister}
            isSubmitting={isSubmitting}
            countdown={countdown}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            showConfirmPassword={showConfirmPassword}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          />
        </div>
      </motion.div>
    </>
  );
};

export default RegisterPage;
