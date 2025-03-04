import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
} from "lucide-react";
import DataTable from "../common/DataTable";

interface ModuleContainerProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  tabs?: { id: string; label: string; content: React.ReactNode }[];
  actions?: { label: string; icon?: React.ReactNode; onClick: () => void }[];
}

const ModuleContainer = ({
  title = "Module Title",
  icon,
  children,
  showBackButton = false,
  onBack = () => {},
  tabs = [],
  actions = [],
}: ModuleContainerProps) => {
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : "");
  const [searchTerm, setSearchTerm] = useState("");

  // Example data for demonstration
  const demoData = [
    {
      id: 1,
      name: "Item 1",
      category: "Category A",
      status: "Active",
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Item 2",
      category: "Category B",
      status: "Inactive",
      date: "2023-05-16",
    },
    {
      id: 3,
      name: "Item 3",
      category: "Category A",
      status: "Active",
      date: "2023-05-17",
    },
    {
      id: 4,
      name: "Item 4",
      category: "Category C",
      status: "Pending",
      date: "2023-05-18",
    },
    {
      id: 5,
      name: "Item 5",
      category: "Category B",
      status: "Active",
      date: "2023-05-19",
    },
  ];

  const columns = [
    { key: "id", header: "ID", width: "w-[80px]" },
    { key: "name", header: "Name" },
    { key: "category", header: "Category" },
    { key: "status", header: "Status" },
    { key: "date", header: "Date", align: "right" as const },
    {
      key: "actions",
      header: "",
      width: "w-[50px]",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-3">
              {icon && <div className="text-primary">{icon}</div>}
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[250px]"
              />
            </div>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export to Excel</DropdownMenuItem>
                <DropdownMenuItem>Export to CSV</DropdownMenuItem>
                <DropdownMenuItem>Export to PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>

            {actions.map((action, index) => (
              <Button key={index} onClick={action.onClick}>
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>

        {tabs.length > 0 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {tabs.length > 0 ? (
          <div>
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {tab.content}
              </TabsContent>
            ))}
          </div>
        ) : children ? (
          children
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Default View</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={demoData}
                columns={columns}
                keyField="id"
                title="Sample Data"
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-white flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleContainer;
