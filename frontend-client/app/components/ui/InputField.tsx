import React from "react";
import { Eye, EyeOff, Ellipsis, LucideIcon } from "lucide-react";

interface InputFieldProps {
  type: string;
  id: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: LucideIcon;
  showToggle?: boolean;
  toggleShow?: () => void;
  required?: boolean;
  autoComplete?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon = Ellipsis,
  showToggle = false,
  toggleShow,
  required,
  autoComplete,
}) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-base"
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
    />
    {showToggle && toggleShow && (
      <button
        type="button"
        onClick={toggleShow}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      >
        {type === "password" ? (
          <Eye className="text-gray-400 text-xl" />
        ) : (
          <EyeOff className="text-gray-400 text-xl" />
        )}
      </button>
    )}
  </div>
);
