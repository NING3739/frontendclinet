import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAuthPage = AUTH_PAGES.some((page) => path.startsWith(page));

  if (isAuthPage) {
    try {
      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_BASE_URL || "https://127.0.0.1:8000/api"
      }/auth/check-login-status`;

      const headers = new Headers();

      request.headers.forEach((value, key) => {
        headers.append(key, value);
      });

      const response = await fetch(apiUrl, {
        method: "GET",
        headers,
        credentials: "include",
      });

      if (response.ok) {
        try {
          const data = await response.json();

          if (data === true) {
            return NextResponse.redirect(new URL("/", request.url));
          }
        } catch (parseError) {
          console.error("解析API响应失败:", parseError);
        }
      }
    } catch (error) {
      console.error("认证检查失败:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/forgot-password"],
};
