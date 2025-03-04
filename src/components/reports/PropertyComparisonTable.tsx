import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowUpDown,
  Download,
  Filter,
  MoreHorizontal,
  RefreshCw,
  Search,
} from "lucide-react";

interface PropertyData {
  id: string;
  name: string;
  location: string;
  occupancyRate: number;
  avgDailyRate: number;
  revPAR: number;
  totalRevenue: number;
  expenses: number;
  profit: number;
  status: "online" | "offline" | "syncing";
}

interface PropertyComparisonTableProps {
  properties?: PropertyData[];
  onExport?: (format: "excel" | "csv" | "pdf") => void;
  onRefresh?: () => void;
  onSort?: (column: keyof PropertyData, direction: "asc" | "desc") => void;
  onFilter?: (filters: Record<string, any>) => void;
}

const PropertyComparisonTable = ({
  properties = [
    {
      id: "1",
      name: "Grand Hotel",
      location: "New York, NY",
      occupancyRate: 87.5,
      avgDailyRate: 245.5,
      revPAR: 214.81,
      totalRevenue: 1250000,
      expenses: 750000,
      profit: 500000,
      status: "online" as const,
    },
    {
      id: "2",
      name: "Seaside Resort",
      location: "Miami, FL",
      occupancyRate: 92.3,
      avgDailyRate: 320.75,
      revPAR: 296.05,
      totalRevenue: 1850000,
      expenses: 1100000,
      profit: 750000,
      status: "online" as const,
    },
    {
      id: "3",
      name: "Mountain Lodge",
      location: "Denver, CO",
      occupancyRate: 78.9,
      avgDailyRate: 195.25,
      revPAR: 154.05,
      totalRevenue: 950000,
      expenses: 620000,
      profit: 330000,
      status: "offline" as const,
    },
    {
      id: "4",
      name: "City Center Inn",
      location: "Chicago, IL",
      occupancyRate: 83.2,
      avgDailyRate: 210.5,
      revPAR: 175.14,
      totalRevenue: 1050000,
      expenses: 680000,
      profit: 370000,
      status: "syncing" as const,
    },
    {
      id: "5",
      name: "Harbor View Hotel",
      location: "Seattle, WA",
      occupancyRate: 85.7,
      avgDailyRate: 235.0,
      revPAR: 201.4,
      totalRevenue: 1150000,
      expenses: 720000,
      profit: 430000,
      status: "online" as const,
    },
  ],
  onExport = () => {},
  onRefresh = () => {},
  onSort = () => {},
  onFilter = () => {},
}: PropertyComparisonTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof PropertyData>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof PropertyData) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort(column, newDirection);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getStatusColor = (status: PropertyData["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "syncing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Property Comparison</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRefresh()}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onFilter({ status: "online" })}>
                Online Properties
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilter({ status: "offline" })}>
                Offline Properties
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilter({ status: "syncing" })}>
                Syncing Properties
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilter({ occupancyRate: { min: 85 } })}
              >
                Occupancy &gt; 85%
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onFilter({ profit: { min: 500000 } })}
              >
                Profit &gt; $500K
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onExport("excel")}>
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("csv")}>
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport("pdf")}>
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[180px] cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Property Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center">
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("occupancyRate")}
                >
                  <div className="flex items-center justify-end">
                    Occupancy Rate
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("avgDailyRate")}
                >
                  <div className="flex items-center justify-end">
                    ADR
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("revPAR")}
                >
                  <div className="flex items-center justify-end">
                    RevPAR
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("totalRevenue")}
                >
                  <div className="flex items-center justify-end">
                    Revenue
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("expenses")}
                >
                  <div className="flex items-center justify-end">
                    Expenses
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("profit")}
                >
                  <div className="flex items-center justify-end">
                    Profit
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer text-center"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center justify-center">
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <TableRow key={property.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {property.name}
                    </TableCell>
                    <TableCell>{property.location}</TableCell>
                    <TableCell className="text-right">
                      {formatPercent(property.occupancyRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(property.avgDailyRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(property.revPAR)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(property.totalRevenue)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(property.expenses)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(property.profit)}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <div
                          className={`h-3 w-3 rounded-full ${getStatusColor(property.status)}`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Property</DropdownMenuItem>
                          <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    No properties found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredProperties.length} of {properties.length} properties
      </div>
    </div>
  );
};

export default PropertyComparisonTable;
