"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { DashboardWrapper } from "@/components/onboarding/dashboard-wrapper";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <DashboardWrapper>
      <div className="min-h-screen bg-slate-50">
        {/* Desktop Header */}
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64 pt-16 min-h-screen">
            <div className="p-4 sm:p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </DashboardWrapper>
  );
}
