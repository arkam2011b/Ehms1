import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  BedDouble,
  Calendar,
  CreditCard,
  DollarSign,
  Hotel,
  Percent,
  Users,
  Utensils,
  Wrench,
} from "lucide-react";
import SyncStatus from "@/components/common/SyncStatus";

interface SinglePropertyDashboardProps {
  propertyId?: string;
  propertyName?: string;
  propertyLocation?: string;
}

const SinglePropertyDashboard = ({
  propertyId = "prop-123",
  propertyName = "Grand Hotel",
  propertyLocation = "New York, NY",
}: SinglePropertyDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the dashboard
  const metrics = {
    occupancyRate: 87.5,
    avgDailyRate: 245.5,
    revPAR: 214.81,
    totalRevenue: 1250000,
    availableRooms: 24,
    totalRooms: 120,
    checkInsToday: 32,
    checkOutsToday: 28,
    pendingMaintenance: 5,
    cleaningInProgress: 18,
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
          <h1 className="text-3xl font-bold">{propertyName}</h1>
          <p className="text-muted-foreground">{propertyLocation}</p>
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
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Occupancy Rate
                </CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatPercent(metrics.occupancyRate)}
                </div>
                <Progress className="mt-2" value={metrics.occupancyRate} />
                <p className="text-xs text-muted-foreground mt-2">
                  +2.5% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Daily Rate
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.avgDailyRate)}
                </div>
                <Progress className="mt-2" value={75} />
                <p className="text-xs text-muted-foreground mt-2">
                  +$15.25 from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.revPAR)}
                </div>
                <Progress className="mt-2" value={80} />
                <p className="text-xs text-muted-foreground mt-2">
                  +$12.40 from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(metrics.totalRevenue)}
                </div>
                <Progress className="mt-2" value={85} />
                <p className="text-xs text-muted-foreground mt-2">
                  +$45,000 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Activity</CardTitle>
              <CardDescription>
                Quick overview of today's operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Check-ins</p>
                    <p className="text-2xl font-bold">
                      {metrics.checkInsToday}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Check-outs</p>
                    <p className="text-2xl font-bold">
                      {metrics.checkOutsToday}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <BedDouble className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Available Rooms</p>
                    <p className="text-2xl font-bold">
                      {metrics.availableRooms}{" "}
                      <span className="text-sm text-muted-foreground">
                        / {metrics.totalRooms}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Wrench className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Maintenance</p>
                    <p className="text-2xl font-bold">
                      {metrics.pendingMaintenance}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Access */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Calendar className="h-6 w-6" />
                  <span>New Reservation</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Users className="h-6 w-6" />
                  <span>Check-in Guest</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Hotel className="h-6 w-6" />
                  <span>Room Status</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Utensils className="h-6 w-6" />
                  <span>F&B Orders</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                System notifications requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <p className="font-medium">
                      Room 304 maintenance request pending for 48+ hours
                    </p>
                  </div>
                  <Badge variant="destructive">Urgent</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <p className="font-medium">
                      Housekeeping staff shortage for evening shift
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-amber-500 border-amber-500"
                  >
                    Warning
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <p className="font-medium">
                      VIP guest arriving tomorrow - Suite 1201 preparation
                      needed
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-blue-500 border-blue-500"
                  >
                    Info
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reservations Module</CardTitle>
              <CardDescription>
                Manage bookings and availability
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Reservations Calendar
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  The full reservations module will be loaded here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rooms Management</CardTitle>
              <CardDescription>Room status and assignments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <BedDouble className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Room Status Overview
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  The full rooms management module will be loaded here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue, expenses and reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <DollarSign className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Financial Dashboard
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  The full financial module will be loaded here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operations Management</CardTitle>
              <CardDescription>
                Housekeeping, maintenance and staff
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center">
                <Wrench className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  Operations Dashboard
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  The full operations module will be loaded here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SinglePropertyDashboard;
