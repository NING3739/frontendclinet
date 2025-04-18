import toast from "react-hot-toast";
import type { ApiResponse } from "@/app/lib/http/apiService";

export type ToastType = "success" | "error" | "loading";

const toastStyle = {
  fontSize: "14px",
  fontWeight: "500",
  padding: "12px 16px",
  borderRadius: "8px",
  color: "#fff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  maxWidth: "320px",
  display: "flex",
  alignItems: "center",
};

const icons = {
  success: "✓",
  error: "✕",
  loading: "⟳",
};

export function handleApiError(
  response: ApiResponse,
  defaultMessage = "请求失败",
  type: ToastType = "error"
): void {
  if (!response.success) {
    const errorMessage =
      response.error?.details?.detail &&
      Array.isArray(response.error.details.detail) &&
      response.error.details.detail[0]?.msg
        ? response.error.details.detail[0].msg
        : defaultMessage;

    const toastConfig = {
      duration: 3000,
      position: "top-right" as const,
      icon: icons[type],
      style: {
        ...toastStyle,
        ...(type === "success" && {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
          borderLeft: "4px solid #00b09b",
        }),
        ...(type === "error" && {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
          borderLeft: "4px solid #ff5f6d",
        }),
        ...(type === "loading" && {
          background: "linear-gradient(to right, #2980b9, #6dd5fa)",
          borderLeft: "4px solid #2980b9",
        }),
      },
    };

    switch (type) {
      case "success":
        toast.success(errorMessage, toastConfig);
        break;
      case "loading":
        toast.loading(errorMessage, {
          ...toastConfig,
          icon: (
            <span
              style={{
                display: "inline-block",
                animation: "spin 1s linear infinite",
              }}
            >
              {icons.loading}
            </span>
          ),
        });
        break;
      case "error":
      default:
        toast.error(errorMessage, toastConfig);
        break;
    }
  }
}
