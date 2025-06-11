import { Link, useMatchRoute, useRouter } from "@tanstack/react-router";

type SidebarNavlinkProps = {
  to: string;
  text: string;
};

const SidebarNavlink = ({ to, text }: SidebarNavlinkProps) => {
  const baseClasses = "block px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100";

  const router = useRouter();
  const match = useMatchRoute();

  // Manually check if current path matches the 'to' prop
  const isActive = router.state.location.pathname === to;

  return (
    <Link
      to={to}
      className={[
        baseClasses,
        isActive ? "text-indigo-700 font-bold bg-gray-100" : "bg-none text-black hover:bg-gray-100",
      ].join(" ")}
    >
      {text}
    </Link>
  );
};

export default SidebarNavlink;
