import PageHeader from "@/components/PageHeader";
import SectionOverview from "@/components/SectionOverview";
import { Button } from "@/components/ui/button";
import BucketStorage from "@/features/bucket/BucketStorage";
import { RecentFile } from "@/features/files/RecentFile";
import { createFileRoute } from "@tanstack/react-router";
import { File, FilePlus, FolderIcon, FolderPlus, Image, MoreVertical } from "lucide-react";

export const Route = createFileRoute("/(protected)/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const headerActions = (
    <div className="flex gap-2">
      <Button>
        <FolderPlus /> Create Folder
      </Button>
      <Button>
        <FilePlus /> Upload Files
      </Button>
    </div>
  );

  const folders = [
    {
      id: 1,
      name: "Invoices",
      files: 212,
      color: "#FF9E09",
    },
    {
      id: 2,
      name: "Wedding",
      files: 97,
      color: "#FF6C3E",
    },
    {
      id: 3,
      name: "Design",
      files: 120,
      color: "#B256EB",
    },
    {
      id: 4,
      name: "Baby Shower",
      files: 231,
      color: "#EE6F4F",
    },
    {
      id: 5,
      name: "School notes",
      files: 530,
      color: "#76D9C6",
    },
    {
      id: 6,
      name: "Blueprints",
      files: 400,
      color: "#6DCC55",
    },
  ];

  const files = [
    {
      id: 1,
      name: "Invoice December 2025",
      size: "267 KB",
      extension: "pdf",
      icon: <File size={28} />,
    },
    {
      id: 2,
      name: "House Blueprint",
      size: "267 KB",
      extension: "pdf",
      icon: <Image size={28} />,
    },
    {
      id: 3,
      name: "Wedding Photo",
      size: "267 KB",
      extension: "png",
      icon: <Image size={28} />,
    },
    {
      id: 4,
      name: "School Essay",
      size: "267 KB",
      extension: "docx",
      icon: <File size={28} />,
    },
    {
      id: 5,
      name: "Mortgage",
      size: "267 KB",
      extension: "pdf",
      icon: <File size={28} />,
    },
    {
      id: 6,
      name: "Preschool Photo",
      size: "267 KB",
      extension: "jpg",
      icon: <Image size={28} />,
    },
  ];

  return (
    <section>
      <PageHeader title="Welcome back, Demo User" actions={headerActions} />
      <div>
        <BucketStorage />
      </div>
      <main className="flex flex-col gap-8">
        <SectionOverview title="Folders">
          {folders.map((folder) => (
            <div className="flex justify-between items-center w-[300px] border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: folder.color }}>
                  <FolderIcon size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{folder.name}</h3>
                  <p className="text-muted-foreground text-sm">{folder.files} files</p>
                </div>
              </div>
            </div>
          ))}
        </SectionOverview>
        <SectionOverview title="Recent Files">
          {files.map((file) => (
            <RecentFile key={file.name} name={file.name} size={file.size} extension={file.extension} icon={file.icon} />
          ))}
        </SectionOverview>
      </main>
    </section>
  );
}
