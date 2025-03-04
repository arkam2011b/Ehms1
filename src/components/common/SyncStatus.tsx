import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cloud, CloudOff, RefreshCw } from "lucide-react";

type SyncState = "online" | "offline" | "syncing";

interface SyncStatusProps {
  initialState?: SyncState;
  onStatusChange?: (status: SyncState) => void;
}

const SyncStatus = ({
  initialState = "online",
  onStatusChange = () => {},
}: SyncStatusProps) => {
  const [status, setStatus] = useState<SyncState>(initialState);
  const [lastSynced, setLastSynced] = useState<Date>(new Date());

  // Simulate network status changes
  useEffect(() => {
    const checkNetworkStatus = () => {
      const isOnline = navigator.onLine;
      if (isOnline && status === "offline") {
        setStatus("syncing");
        // Simulate sync process
        setTimeout(() => {
          setStatus("online");
          setLastSynced(new Date());
        }, 2000);
      } else if (!isOnline && status !== "offline") {
        setStatus("offline");
      }
    };

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    // Initial check
    checkNetworkStatus();

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, [status]);

  // Notify parent component when status changes
  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);

  const getStatusDetails = () => {
    switch (status) {
      case "online":
        return {
          icon: <Cloud className="h-4 w-4" />,
          label: "Online",
          variant: "outline",
          className:
            "bg-green-100 text-green-700 hover:bg-green-100 border-green-200",
          tooltip: `Last synced: ${lastSynced.toLocaleTimeString()}`,
        };
      case "offline":
        return {
          icon: <CloudOff className="h-4 w-4" />,
          label: "Offline",
          variant: "outline",
          className: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
          tooltip:
            "Working offline. Changes will sync when connection is restored.",
        };
      case "syncing":
        return {
          icon: <RefreshCw className="h-4 w-4 animate-spin" />,
          label: "Syncing",
          variant: "outline",
          className:
            "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
          tooltip: "Synchronizing data with cloud...",
        };
    }
  };

  const details = getStatusDetails();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={`flex items-center gap-1 px-3 py-1 ${details.className}`}
          >
            {details.icon}
            <span>{details.label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{details.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SyncStatus;
