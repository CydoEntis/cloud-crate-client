import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SidebarNavlinkProps = {
  to: string;
  text: string;
  icon: React.ReactElement;
};

const SidebarNavlink = ({ to, text, icon }: SidebarNavlinkProps) => {
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

  const slideX = 8;

  return (
    <div className="relative px-2">
      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute top-0 right-0 w-1 bg-primary rounded-l-2xl"
          style={{ height }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
      <Link
        to={to}
        ref={ref}
        className="px-4 py-2 pr-5 rounded-lg font-medium relative z-10 flex items-center justify-between h-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.span
          initial={{ x: 0 }}
          animate={{
            x: isActive || isHovered ? slideX : 0,
            color: isActive ? "#7C86FF" : isHovered ? "#7C86FF" : "#6b7280",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="font-medium flex items-center gap-4"
        >
          <>{icon}</>
          {text}
        </motion.span>
      </Link>
    </div>
  );
};

export default SidebarNavlink;
