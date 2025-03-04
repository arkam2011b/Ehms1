import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Sidebar from "../layout/Sidebar";
import PropertySelector from "../property/PropertySelector";
import SinglePropertyDashboard from "../property/SinglePropertyDashboard";
import MultiPropertyDashboard from "../property/MultiPropertyDashboard";
import SyncStatus from "../common/SyncStatus";

interface DashboardProps {
  userName?: string;
  userRole?: string;
}

const Dashboard = ({
  userName = "John Smith",
  userRole = "Administrator",
}: DashboardProps) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"single" | "multi">("single");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    "prop-123",
  );
  const [selectedPropertyName, setSelectedPropertyName] =
    useState<string>("Grand Hotel");

  const handlePropertyChange = (id: string, name: string) => {
    setSelectedPropertyId(id);
    setSelectedPropertyName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <PropertySelector
              onPropertyChange={handlePropertyChange}
              selectedPropertyId={selectedPropertyId}
            />

            <Tabs
              value={viewMode}
              onValueChange={(value) =>
                setViewMode(value as "single" | "multi")
              }
              className="ml-4"
            >
              <TabsList>
                <TabsTrigger value="single">Single Property</TabsTrigger>
                <TabsTrigger value="multi">Enterprise View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center space-x-4">
            <SyncStatus />

            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Separator orientation="vertical" className="h-8" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {userRole}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          {viewMode === "single" && selectedPropertyId ? (
            <SinglePropertyDashboard
              propertyId={selectedPropertyId}
              propertyName={selectedPropertyName}
            />
          ) : (
            <MultiPropertyDashboard />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
