import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useFolderModalStore } from "../store/useFolderModalStore";

type FolderContentsToolbarProps = {
  crateId: string;
};

function FolderContentsToolbar({ crateId }: FolderContentsToolbarProps) {
  const open = useFolderModalStore((s) => s.open);
  return (
    <div>
      <Button className="flex gap-2 items-center" onClick={() => open(crateId)}>
        <Plus /> New Folder
      </Button>
    </div>
  );
}

export default FolderContentsToolbar;
