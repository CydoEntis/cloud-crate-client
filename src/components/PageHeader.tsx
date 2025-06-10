import { Button } from "./ui/button";
import { ChevronLeft, Settings } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="p-4 border-b border-gray-300">
      <div className="mt-4 flex justify-between items-center">
        <h3 className="text-4xl font-bold">{title}</h3>
        <div className="flex gap-2">{actions && actions}</div>
      </div>
      <p className="pt-2">{description}</p>
    </header>
  );
}

export default PageHeader;
