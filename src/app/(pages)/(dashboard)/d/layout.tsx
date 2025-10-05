'use client';
import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Overview", href: "/d/overview" },
  { name: "Temporal Analysis", href: "/d/temporal-analysis" },
  { name: "Topic Analysis", href: "/d/topic-analysis" },
  { name: "Entity Analysis", href: "/d/entity-analysis" },
  { name: "Knowledge Graph", href: "/d/knowledge-graph" },
  { name: "Search Publications", href: "/d/search-publications" },
  { name: "AI Insights", href: "/d/ai-insights" },
  { name: "Export Data", href: "/d/export-data" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-muted/10">
      {/* Sidebar (Fixed) */}
      <aside className="w-64 bg-background border-r shadow-sm p-4 flex flex-col h-full fixed left-0 top-0">
        <div className="text-2xl font-bold mb-6">NASA BioDash</div>

        <nav className="flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />
        <p className="text-xs text-muted-foreground">
          © 2025 NASA Space Apps
        </p>
      </aside>

      {/* Main content with scroll */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
