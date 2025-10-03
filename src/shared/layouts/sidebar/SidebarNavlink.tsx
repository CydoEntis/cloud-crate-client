import { Link, useRouterState } from "@tanstack/react-router";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SidebarNavlinkProps = {
  to: string;
  text: string;
  icon: React.ReactElement;
  onClick?: () => void;
};

const ANIMATION_CONFIG = {
  slideX: 8,
  indicator: { type: "spring", stiffness: 300, damping: 25 },
  slide: { type: "spring", stiffness: 300, damping: 30 },
} as const;

const SidebarNavlink = ({ to, text, icon, onClick }: SidebarNavlinkProps) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = pathname === to || pathname.startsWith(to + "/");
  const ref = useRef<HTMLAnchorElement>(null);
  const [height, setHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  return (
    <div className="relative px-2">
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute top-0 right-0 w-1 bg-primary rounded-l-2xl"
          style={{ height }}
          transition={ANIMATION_CONFIG.indicator}
        />
      )}

      <Link
        to={to}
        ref={ref}
        className="block px-4 py-2 pr-5 rounded-lg  relative z-10 h-10 text-sm font-medium"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
      >
        <motion.span
          initial={{ x: 0 }}
          animate={{ x: isActive || isHovered ? ANIMATION_CONFIG.slideX : 0 }}
          transition={ANIMATION_CONFIG.slide}
          className={clsx("font-medium flex items-center gap-4 transition-colors duration-200 h-full", {
            "text-primary": isActive,
            "text-primary/80": !isActive && isHovered,
            "text-muted-foreground": !isActive && !isHovered,
          })}
        >
          {icon}
          {text}
        </motion.span>
      </Link>
    </div>
  );
};

export default SidebarNavlink;
