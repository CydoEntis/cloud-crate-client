import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatBytes } from "@/lib/formatBytes";

type StorageRadialProgressProps = {
  used: number;
  total: number;
  size?: number; // overall px size of circle
  strokeWidth?: number; // thickness of circle
};

function StorageRadialProgress({
  used,
  total,
  size = 48,
  strokeWidth = 6,
}: StorageRadialProgressProps) {
  let rawPercent = total > 0 ? (used / total) * 100 : 0;

  // Clamp actual percent (for text)
  const actualPercent = rawPercent > 0 && rawPercent < 1 ? 1 : rawPercent;

  // Clamp display percent (for arc fill)
  const displayPercent = rawPercent > 0 && rawPercent < 5 ? 5 : rawPercent;

  // ✅ Correct radius calculation so stroke is fully visible
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayPercent / 100) * circumference;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            {/* Background track */}
            <CircleSvg size={size} radius={radius} strokeWidth={strokeWidth} />

            {/* Animated progress arc */}
            <svg width={size} height={size} className="rotate-[-90deg] absolute">
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

            {/* Centered percent text */}
            <span className="absolute text-[11px] font-bold text-foreground">
              {Math.round(actualPercent)}%
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {formatBytes(used)} / {formatBytes(total)}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default StorageRadialProgress;

function CircleSvg({
  size,
  radius,
  strokeWidth,
}: {
  size: number;
  radius: number;
  strokeWidth: number;
}) {
  return (
    <svg width={size} height={size} className="rotate-[-90deg] absolute">
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
  );
}
