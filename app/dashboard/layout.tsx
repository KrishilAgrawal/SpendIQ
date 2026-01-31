import { AppShell } from "@/components/layout/app-shell";
import AuthCheck from "@/components/auth/AuthCheck";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <AppShell>{children}</AppShell>
    </AuthCheck>
  );
}
