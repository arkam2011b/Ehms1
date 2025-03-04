import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowUpDown,
  ChevronDown,
  Copy,
  Download,
  FileSpreadsheet,
  Filter,
  Printer,
  Search,
  Settings,
  Trash,
} from "lucide-react";

interface Column<T> {
  key: keyof T;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  title?: string;
  onRowClick?: (row: T) => void;
  onExport?: (format: "excel" | "csv" | "pdf") => void;
  onDelete?: (rows: T[]) => void;
  onEdit?: (row: T) => void;
  showToolbar?: boolean;
  showContextMenu?: boolean;
  isLoading?: boolean;
}

function DataTable<T>({
  data = [],
  columns = [],
  keyField,
  title = "Data Table",
  onRowClick = () => {},
  onExport = () => {},
  onDelete = () => {},
  onEdit = () => {},
  showToolbar = true,
  showContextMenu = true,
  isLoading = false,
}: DataTableProps<T>) {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase()),
      );
    });

    setFilteredData(filtered);
  };

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === bValue) return 0;

      if (direction === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });

    setFilteredData(sorted);
  };

  const handleRowSelect = (row: T, isSelected: boolean) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, row]);
    } else {
      setSelectedRows(
        selectedRows.filter((r) => r[keyField] !== row[keyField]),
      );
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedRows([...filteredData]);
    } else {
      setSelectedRows([]);
    }
  };

  const isRowSelected = (row: T) => {
    return selectedRows.some((r) => r[keyField] === row[keyField]);
  };

  const getSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }

    return sortConfig.direction === "asc" ? (
      <ArrowDownAZ className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpAZ className="ml-2 h-4 w-4" />
    );
  };

  const handleExport = (format: "excel" | "csv" | "pdf") => {
    onExport(format);
  };

  const handleKeyDown = (e: React.KeyboardEvent, row: T) => {
    // Excel-like keyboard shortcuts
    if (e.ctrlKey && e.key === "c") {
      // Copy cell content
      const selection = window.getSelection();
      if (selection) {
        navigator.clipboard.writeText(selection.toString());
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-md border">
      {showToolbar && (
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8 w-[200px]"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Show All</DropdownMenuItem>
                <DropdownMenuSeparator />
                {columns
                  .filter((col) => col.filterable !== false)
                  .map((column) => (
                    <DropdownMenuItem key={String(column.key)}>
                      Filter by {column.header}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export to CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                  <Download className="mr-2 h-4 w-4" />
                  Export to PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <ContextMenu>
          <ContextMenuTrigger>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={String(column.key)}
                      className={`${column.width || ""} ${column.align === "right" ? "text-right" : column.align === "center" ? "text-center" : "text-left"} ${column.sortable !== false ? "cursor-pointer" : ""}`}
                      onClick={() =>
                        column.sortable !== false && handleSort(column.key)
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span>{column.header}</span>
                        {column.sortable !== false && getSortIcon(column.key)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Loading data...
                    </TableCell>
                  </TableRow>
                ) : filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((row) => (
                    <TableRow
                      key={String(row[keyField])}
                      className={`${isRowSelected(row) ? "bg-primary/5" : ""} hover:bg-muted/50 cursor-pointer`}
                      onClick={() => onRowClick(row)}
                      onKeyDown={(e) => handleKeyDown(e, row)}
                      tabIndex={0}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={`${String(row[keyField])}-${String(column.key)}`}
                          className={
                            column.align === "right"
                              ? "text-right"
                              : column.align === "center"
                                ? "text-center"
                                : "text-left"
                          }
                        >
                          {column.cell
                            ? column.cell(row)
                            : String(row[column.key] || "")}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ContextMenuTrigger>

          {showContextMenu && (
            <ContextMenuContent className="w-64">
              <ContextMenuItem
                onClick={() =>
                  selectedRows.length === 1 && onEdit(selectedRows[0])
                }
              >
                Edit
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(selectedRows))
                }
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() => onDelete(selectedRows)}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>
      </div>

      <div className="p-4 border-t flex justify-between items-center text-sm text-muted-foreground">
        <div>
          {selectedRows.length > 0
            ? `${selectedRows.length} row(s) selected`
            : `Showing ${filteredData.length} of ${data.length} entries`}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={selectedRows.length === 0}
            onClick={() => onDelete(selectedRows)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Selected
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
