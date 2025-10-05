"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Kbd } from "@/components/ui/kbd";
import { FiHome, FiClock, FiSearch } from "react-icons/fi";
import { IoShapesSharp } from "react-icons/io5";
import { GiBrain } from "react-icons/gi";
import { VscGraphScatter } from "react-icons/vsc";

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const navItems: NavItem[] = [
  { name: "Overview", href: "/d/overview", icon: FiHome },
  { name: "Publication Analysis", href: "/d/publication-analysis", icon: FiClock },
  { name: "Entity Analysis", href: "/d/entity-analysis", icon: IoShapesSharp },
  { name: "AI Insights", href: "/d/ai-insights", icon: GiBrain },
  { name: "Knowledge Graph", href: "/d/knowledge-graph", icon: VscGraphScatter },
  { name: "Search Publications", href: "/d/search-publications", icon: FiSearch },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar(); // <- get the current state
  const isCollapsed = state === "collapsed"; // <- derive collapsed

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-10 rounded bg-primary/15">
          <Image src="/assets/images/Colorway=2-Color White.png" alt="NASA Logo" width={36} height={36} /> 
          </div>       
          <span className="font-semibold tracking-tight">
            {isCollapsed ? "NB" : "NASA BioDash"}
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map(({ name, href, icon: Icon }) => {
              const isActive =
                pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={isCollapsed ? name : undefined}
                  >
                    <Link href={href} aria-current={isActive ? "page" : undefined}>
                      <Icon size={18} />
                      <span className="truncate">{name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3 text-xs text-muted-foreground">
        {!isCollapsed && (
          <div className="flex flex-col gap-1.5">
            <p className="flex items-center gap-1.5">
              Toggle: <Kbd>⌘</Kbd> + <Kbd>B</Kbd>
              <span className="mx-1 text-muted-foreground/70">or</span>
              <Kbd>Ctrl</Kbd> + <Kbd>B</Kbd>
            </p>
            <p>© 2025 NASA Space Apps</p>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}