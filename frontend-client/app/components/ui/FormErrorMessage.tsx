import React from "react";
import { AlertCircle } from "lucide-react";

interface FormErrorMessageProps {
  error: string;
}

export const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  return (
    <div className="mb-4 flex items-center justify-center bg-red-500 text-white text-center p-4 rounded-lg">
      <AlertCircle className="mr-2 text-xl" />
      {error}
    </div>
  );
};
