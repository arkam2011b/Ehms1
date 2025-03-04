import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  Calendar,
  ChevronLeft,
  CreditCard,
  Home,
  Hotel,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
  Utensils,
  Wrench,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

const Sidebar = ({
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      title: "Reservations",
      icon: <Calendar className="h-5 w-5" />,
      path: "/reservations",
      badge: 5,
    },
    {
      title: "Front Desk",
      icon: <Users className="h-5 w-5" />,
      path: "/front-desk",
    },
    {
      title: "Housekeeping",
      icon: <Home className="h-5 w-5" />,
      path: "/housekeeping",
    },
    {
      title: "F&B Management",
      icon: <Utensils className="h-5 w-5" />,
      path: "/food-beverage",
    },
    {
      title: "Accounting",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/accounting",
    },
    {
      title: "Maintenance",
      icon: <Wrench className="h-5 w-5" />,
      path: "/maintenance",
      badge: 3,
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      title: "Reports",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/reports",
    },
    {
      title: "Inventory",
      icon: <ShoppingCart className="h-5 w-5" />,
      path: "/inventory",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/messages",
      badge: 8,
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  const NavItem = ({ item }: { item: NavItem }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              "hover:bg-muted",
            )}
          >
            {item.icon}
            {!isCollapsed && (
              <span className="flex-1 text-sm font-medium">{item.title}</span>
            )}
            {!isCollapsed && item.badge && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>{item.title}</p>
            {item.badge && <span className="ml-1 text-xs">({item.badge})</span>}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-white transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-center border-b px-4">
        <div className="flex items-center gap-2">
          <Hotel className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="text-lg font-semibold">Hotel Manager</span>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {secondaryNavItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleCollapse}
          className="w-full"
        >
          <CustomChevronLeft
            className={cn("h-4 w-4", isCollapsed && "rotate-180")}
          />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;

function CustomChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
