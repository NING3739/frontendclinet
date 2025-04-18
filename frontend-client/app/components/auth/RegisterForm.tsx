import React, { FormEvent } from "react";
import { InputField } from "@/app/components/ui/InputField";
import { Mail, Lock, User, Key } from "lucide-react";
import { EmailPayload, RegisterPayload } from "@/app/types/authType";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useGetText } from "@/app/lib/utils/i18n";

interface RegisterFormProps {
  handleRegister: (payload: RegisterPayload) => Promise<void>;
  formData: RegisterPayload;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  showConfirmPassword: boolean;
  toggleConfirmPasswordVisibility: () => void;
  isSubmitting: boolean;
  isCodeSent: boolean;
  countdown: number;
  isSendingCode: boolean;
  handleSendCode: (payload: EmailPayload) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  handleRegister,
  formData,
  handleInputChange,
  showPassword,
  togglePasswordVisibility,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
  isSubmitting,
  isCodeSent,
  countdown,
  isSendingCode,
  handleSendCode,
}) => {
  const { language } = useLanguage();
  const getText = useGetText(language);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(formData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <InputField
        type="email"
        id="email"
        name="email"
        value={formData.email || ""}
        onChange={handleInputChange}
        placeholder={getText("inputEmail")}
        icon={Mail}
        required
        autoComplete="email"
      />
      <div className="flex items-center space-x-2">
        <div className="flex-grow">
          <InputField
            type="text"
            id="verificationCode"
            name="code"
            value={formData.code || ""}
            onChange={handleInputChange}
            placeholder={getText("inputCode")}
            icon={Key}
            required
            autoComplete="off"
          />
        </div>
        <button
          type="button"
          onClick={() => handleSendCode({ email: formData.email })}
          disabled={countdown > 0 || isSendingCode}
          className={`h-12 flex-shrink-0 px-4 rounded-lg transition-colors text-base font-medium flex items-center justify-center ${
            isSendingCode
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : countdown > 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:bg-blue-600"
          }`}
        >
          {isSendingCode ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : countdown > 0 ? (
            `${getText("resendCode")} (${countdown}s)`
          ) : (
            getText("getConfirmCode")
          )}
        </button>
      </div>
      <InputField
        type="text"
        id="username"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
        placeholder={getText("inputUsername")}
        icon={User}
        required
        autoComplete="username"
      />
      <InputField
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        value={formData.password || ""}
        onChange={handleInputChange}
        placeholder={getText("inputPassword")}
        icon={Lock}
        showToggle
        toggleShow={togglePasswordVisibility}
        required
        autoComplete="new-password"
      />
      <InputField
        type={showConfirmPassword ? "text" : "password"}
        id="confirm_password"
        name="confirm_password"
        value={formData.confirm_password || ""}
        onChange={handleInputChange}
        placeholder={getText("inputConfirmPassword")}
        icon={Lock}
        showToggle
        toggleShow={toggleConfirmPasswordVisibility}
        required
        autoComplete="new-password"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg text-base font-medium transition-colors ${
          isSubmitting
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:bg-blue-600 hover:scale-105 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 hover:shadow-xl"
        }`}
      >
        {isSubmitting ? getText("isRegistering") : getText("register")}
      </button>
    </form>
  );
};
