import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  Hotel,
  MapPin,
  Percent,
  Plus,
  RefreshCw,
  Search,
  Settings,
} from "lucide-react";
import PropertyComparisonTable from "../reports/PropertyComparisonTable";
import SyncStatus from "../common/SyncStatus";

interface MultiPropertyDashboardProps {
  // Add props as needed
}

const MultiPropertyDashboard = ({}: MultiPropertyDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the dashboard
  const enterpriseMetrics = {
    totalProperties: 5,
    onlineProperties: 3,
    offlineProperties: 1,
    syncingProperties: 1,
    avgOccupancyRate: 85.5,
    totalRevenue: 6250000,
    totalRooms: 520,
    occupiedRooms: 442,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="w-full h-full bg-background p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Enterprise Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of all properties in your organization
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SyncStatus />
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Select Date Range
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Property Comparison</TabsTrigger>
          <TabsTrigger value="settings">Enterprise Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enterprise Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Properties
                </CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enterpriseMetrics.totalProperties}
                </div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                    <span>{enterpriseMetrics.onlineProperties} Online</span>
                  </div>
                  <Separator orientation="vertical" className="mx-2 h-3" />
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-1" />
                    <span>{enterpriseMetrics.offlineProperties} Offline</span>
                  </div>
                  <Separator orientation="vertical" className="mx-2 h-3" />
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1" />
                    <span>{enterpriseMetrics.syncingProperties} Syncing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Occupancy
                </CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPercent(enterpriseMetrics.avgOccupancyRate)}
                </div>
                <Progress
                  className="mt-2"
                  value={enterpriseMetrics.avgOccupancyRate}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  +3.2% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(enterpriseMetrics.totalRevenue)}
                </div>
                <Progress className="mt-2" value={80} />
                <p className="text-xs text-muted-foreground mt-2">
                  +$250,000 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Room Occupancy
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {enterpriseMetrics.occupiedRooms} /{" "}
                  {enterpriseMetrics.totalRooms}
                </div>
                <Progress
                  className="mt-2"
                  value={
                    (enterpriseMetrics.occupiedRooms /
                      enterpriseMetrics.totalRooms) *
                    100
                  }
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {formatPercent(
                    (enterpriseMetrics.occupiedRooms /
                      enterpriseMetrics.totalRooms) *
                      100,
                  )}{" "}
                  occupancy rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Property Map */}
          <Card>
            <CardHeader>
              <CardTitle>Property Locations</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Interactive Property Map
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Geographic distribution of all properties
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Plus className="h-6 w-6" />
                  <span>Add New Property</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Settings className="h-6 w-6" />
                  <span>Global Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span>Generate Reports</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <RefreshCw className="h-6 w-6" />
                  <span>Sync All Properties</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Property List Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Property Overview</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <PropertyComparisonTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Property Comparison</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search properties..."
                    className="pl-8 w-64"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PropertyComparisonTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Settings</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Settings className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Global Configuration
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Enterprise-wide settings and configuration options
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiPropertyDashboard;
