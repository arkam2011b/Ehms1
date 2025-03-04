import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "syncing";
}

interface PropertySelectorProps {
  properties?: Property[];
  selectedPropertyId?: string | null;
  onPropertyChange?: (id: string, name: string) => void;
  disabled?: boolean;
}

const PropertySelector = ({
  properties = [
    {
      id: "prop-123",
      name: "Grand Hotel",
      location: "New York, NY",
      status: "online" as const,
    },
    {
      id: "prop-456",
      name: "Seaside Resort",
      location: "Miami, FL",
      status: "online" as const,
    },
    {
      id: "prop-789",
      name: "Mountain Lodge",
      location: "Denver, CO",
      status: "offline" as const,
    },
    {
      id: "prop-101",
      name: "City Center Inn",
      location: "Chicago, IL",
      status: "syncing" as const,
    },
    {
      id: "prop-202",
      name: "Harbor View Hotel",
      location: "Seattle, WA",
      status: "online" as const,
    },
  ],
  selectedPropertyId = null,
  onPropertyChange = () => {},
  disabled = false,
}: PropertySelectorProps) => {
  const [open, setOpen] = useState(false);

  const selectedProperty = properties.find(
    (property) => property.id === selectedPropertyId,
  );

  const getStatusColor = (status: Property["status"]) => {
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
          disabled={disabled}
        >
          {selectedProperty ? (
            <div className="flex items-center">
              <div
                className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(
                  selectedProperty.status,
                )}`}
              />
              <span>{selectedProperty.name}</span>
            </div>
          ) : (
            "Select property"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search property..." />
          <CommandEmpty>No property found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {properties.map((property) => (
                <CommandItem
                  key={property.id}
                  value={property.id}
                  onSelect={() => {
                    onPropertyChange(property.id, property.name);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(
                        property.status,
                      )}`}
                    />
                    <span>{property.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPropertyId === property.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PropertySelector;
