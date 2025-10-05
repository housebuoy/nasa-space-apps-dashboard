"use client";

import { ReactNode, useEffect } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";

function SidebarHotkeys() {
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMetaB = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b";
      if (isMetaB) {
        e.preventDefault();
        toggleSidebar();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  return null;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarHotkeys />

      <AppSidebar />

      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b bg-background px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm font-bold text-muted-foreground">NASA BioDash</div>
        </header>

        <main className="flex-1 bg-muted/10 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}