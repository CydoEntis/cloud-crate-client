import { Button } from "./ui/button";
import { ChevronLeft, Settings } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <header className="py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-semibold">{title}</h3>
        <div className="flex gap-2 items-center">{actions && actions}</div>
      </div>
      <p className="pt-2">{description}</p>
    </header>
  );
}

export default PageHeader;
