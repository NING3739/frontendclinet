import AnimatedBackground from "@/app/components/ui/AnimatedBackground";
import { AuthProvider } from "@/app/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      <AnimatedBackground />
      <AuthProvider>
        <Toaster />
        <div className="relative z-10 w-full min-h-screen">{children}</div>
      </AuthProvider>
        
    </div>
  );
}
