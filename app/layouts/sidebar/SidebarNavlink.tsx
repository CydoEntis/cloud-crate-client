import { NavLink } from "react-router";

type SidebarNavlinkProps = {
  to: string;
  text: string;
};

const SidebarNavlink = ({ to, text }: SidebarNavlinkProps) => {
  const baseClasses = "block px-4 py-2 rounded-lg font-medium transition-colors hover:bg-gray-100";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [baseClasses, isActive ? "text-purple-700 font-bold bg-gray-100" : "bg-none text-black hover:bg-gray-100"].join(" ")
      }
    >
      {text}
    </NavLink>
  );
};

export default SidebarNavlink;
