"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ActionTooltipProps {
  label: string;
  side: "top" | "right" | "bottom" | "left";
  align: "start" | "center" | "end";
  children: React.ReactNode;
}

const ActionTooltip: React.FC<ActionTooltipProps> = ({
  label,
  side,
  align,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="font-semibold text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ActionTooltip