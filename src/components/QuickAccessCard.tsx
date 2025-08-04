import type { Folder } from "@/routes/(protected)/dashboard";
import { FolderIcon } from "lucide-react";
import React from "react";

type QuickAccessCardProps = {
  folder: Folder;
};

function QuickAccessCard({ folder }: QuickAccessCardProps) {
  return (
    <div className="flex justify-between items-center w-full rounded-xl p-4 bg-card">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-xl" style={{ backgroundColor: folder.color }}>
          <FolderIcon size={24} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{folder.name}</h3>
          <p className="text-muted-foreground text-sm">
            {folder.size} GB * {folder.files} files
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuickAccessCard;
