import React, { FormEvent, useEffect } from "react";
import { InputField } from "@/app/components/ui/InputField";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { LogInPayload } from "@/app/types/authType";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useGetText } from "@/app/lib/utils/i18n";
import { useAuth } from "@/app/hooks/useAuth";

interface LoginFormProps {
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
  formData: LogInPayload;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin,
  formData,
  handleInputChange,
  showPassword,
  togglePasswordVisibility,
}) => {
  const { loading } = useAuth();
  const { language } = useLanguage();
  const getText = useGetText(language);
  return (
    <form onSubmit={handleLogin} className="space-y-8">
      <InputField
        type="email"
        id="email"
        name="email"
        value={formData.email || ""}
        onChange={handleInputChange}
        placeholder="your@example.com"
        icon={Mail}
        required
        autoComplete="email"
      />
      <InputField
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        value={formData.password || ""}
        onChange={handleInputChange}
        placeholder="•••••••••"
        icon={Lock}
        showToggle
        toggleShow={togglePasswordVisibility}
        required
        autoComplete="current-password"
      />
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {getText("forgotPassword")}
        </Link>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg transition-all duration-300 text-base font-medium focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center ${
          loading
            ? "opacity-70 cursor-not-allowed"
            : "hover:bg-blue-600 transform hover:scale-105 hover:shadow-xl"
        }`}
      >
        {loading ? (
          <>
            <span className="inline-block mr-2 h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            {getText("login")}
          </>
        ) : (
          getText("login")
        )}
      </button>
    </form>
  );
};
