"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication immediately
    const checkAuth = () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // Store the intended destination
        const redirectPath = pathname || "/dashboard";
        // Redirect to login with return URL
        router.replace(`/login?redirect=${encodeURIComponent(redirectPath)}`);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Show nothing while checking (prevents flash of content)
  if (isAuthenticated === null || isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
}
