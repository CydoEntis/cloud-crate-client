import { motion } from "framer-motion";
import { Progress } from "@radix-ui/react-progress";
import { formatBytes } from "@/shared/lib/formatBytes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type StorageProgressProps = {
  used: number;
  total: number;
  width?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "linear" | "radial";
};

export default function StorageProgress({
  used,
  total,
  width = 100,
  size = 36,
  strokeWidth = 4,
  variant = "radial",
}: StorageProgressProps) {
  const rawPercent = total > 0 ? (used / total) * 100 : 0;

  const displayPercent = rawPercent > 0 && rawPercent < 5 ? 5 : rawPercent;
  const percent = Math.min(displayPercent, 100);

  const remaining = total - used;

  if (variant === "linear") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div style={{ width }} className="relative">
              <div className="flex items-center gap-2">
                <Progress value={percent} className="h-1.5 rounded-md bg-secondary" />
                <span className="text-xs font-semibold text-foreground">{Math.round(rawPercent)}%</span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">{formatBytes(remaining)} remaining</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Radial variant
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative" style={{ width: size, height: size }}>
            {/* Background circle */}
            <svg width={size} height={size} className="absolute rotate-[-90deg]">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-secondary"
                fill="transparent"
              />
            </svg>

            {/* Animated progress */}
            <svg width={size} height={size} className="absolute rotate-[-90deg]">
              <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="transparent"
                className="text-primary"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </svg>

            {/* Percent text */}
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
              {Math.round(rawPercent)}%
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{formatBytes(remaining)} remaining</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
