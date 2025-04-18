import React from "react";
import Link from "next/link";
import { useLanguage } from "@/app/hooks/useLanguage";
import { useGetText } from "@/app/lib/utils/i18n";

interface FormHeaderProps {
  type: "login" | "register" | "reset";
}

export const FormHeader = ({ type }: FormHeaderProps) => {
  const { language } = useLanguage();
  const getText = useGetText(language);

  let headerText;
  let promptText;
  let promptLink;
  let linkTo;

  switch (type) {
    case "login":
      headerText = getText("loginAccount");
      promptText = getText("noAccount");
      promptLink = getText("registerNow");
      linkTo = "/register";
      1;
      break;
    case "register":
      headerText = getText("registerAccount");
      promptText = getText("alreadyHaveAccount");
      promptLink = getText("loginNow");
      linkTo = "/login";
      break;
    case "reset":
      headerText = getText("resetPassword");
      promptText = getText("isRememberPassword");
      promptLink = getText("loginNow");
      linkTo = "/login";
      break;
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <h2
        className={` ${
          language === "chinese"
            ? "text-2xl font-medium"
            : "text-2xl font-normal"
        } text-transparent bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text`}
      >
        {headerText}
      </h2>
      {promptText && (
        <div className={`${language === "chinese" ? "text-base" : "text-sm"}`}>
          {promptText}
          <Link
            href={linkTo}
            className="text-transparent bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text ml-1 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 hover:bg-clip-text transition-all duration-300"
          >
            {promptLink}
          </Link>
        </div>
      )}
    </div>
  );
};
