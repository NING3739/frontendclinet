import React, { useState } from "react";
import { FaMicrosoft, FaGithub } from "react-icons/fa";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useGetText } from "@/app/lib/utils/i18n";
import { toast } from "react-hot-toast";

export const SocialLoginButtons: React.FC = () => {
  const [loading, setLoading] = useState({
    github: false,
    microsoft: false,
  });

  const handleMicrosoftLogin = () => {
    setLoading((prev) => ({ ...prev, microsoft: true }));
    try {
      window.location.href = `https://127.0.0.1:8000/api/auth/microsoft-login`;
    } catch (error) {
      console.error("Microsoft login error:", error);
      toast.error("无法跳转到 Microsoft 登录页面，请稍后再试");
      setLoading((prev) => ({ ...prev, microsoft: false }));
    }
  };

  const handleGithubLogin = () => {
    setLoading((prev) => ({ ...prev, github: true }));
    try {
      window.location.href = `https://127.0.0.1:8000/api/auth/github-login`;
    } catch (error) {
      console.error("GitHub login error:", error);
      toast.error("无法跳转到 GitHub 登录页面，请稍后再试");
      setLoading((prev) => ({ ...prev, github: false }));
    }
  };

  const { language } = useLanguage();
  const getText = useGetText(language);

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={handleMicrosoftLogin}
        disabled={loading.microsoft}
        className={`flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-base ${
          loading.microsoft ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading.microsoft ? (
          <span>{getText("isRedirecting")}</span>
        ) : (
          <>
            <FaMicrosoft className="text-xl mr-2 text-blue-600" />
            Microsoft
          </>
        )}
      </button>
      <button
        onClick={handleGithubLogin}
        disabled={loading.github}
        className={`flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-base ${
          loading.github ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading.github ? (
          <span>{getText("isRedirecting")}</span>
        ) : (
          <>
            <FaGithub className="text-xl mr-2" />
            GitHub
          </>
        )}
      </button>
    </div>
  );
};
