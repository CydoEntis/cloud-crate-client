import PageHeader from "@/components/PageHeader";
import SectionOverview from "@/components/SectionOverview";
import { Button } from "@/components/ui/button";
import BucketStorage from "@/features/bucket/BucketStorage";
import { RecentFile } from "@/features/files/RecentFile";
import { createFileRoute } from "@tanstack/react-router";
import { Cloud, File, FilePlus, FolderIcon, FolderPlus, Image, MoreVertical } from "lucide-react";

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
      size: 0.65,
    },
    {
      id: 2,
      name: "Wedding",
      files: 97,
      color: "#FF6C3E",
      size: 0.1,
    },
    {
      id: 3,
      name: "Design",
      files: 120,
      color: "#B256EB",
      size: 0.75,
    },
    {
      id: 4,
      name: "Baby Shower",
      files: 231,
      color: "#EE6F4F",
      size: 1.1,
    },
    {
      id: 5,
      name: "School notes",
      files: 530,
      color: "#76D9C6",
      size: 0.5,
    },
    {
      id: 6,
      name: "Blueprints",
      files: 400,
      color: "#6DCC55",
      size: 1.6,
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
      <header></header>
      <PageHeader title="Welcome back, Demo User" actions={headerActions} />
      <main className="grid grid-cols-5 gap-8">
        <section className="col-span-4 flex flex-col gap-8">
          <SectionOverview title="Recent Folders">
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
              <RecentFile
                key={file.name}
                name={file.name}
                size={file.size}
                extension={file.extension}
                icon={file.icon}
              />
            ))}
          </SectionOverview>
        </section>
        <aside className="col-span-1 flex flex-col gap-4">
          <div className="rounded-xl  p-4 shadow-md border">
            <div className="flex gap-2 mb-4">
              <Cloud size={24} />
              <h3 className="font-semibold text-lg">Storage</h3>
            </div>
            <BucketStorage />
          </div>
          <div className="p-4 rounded-xl bg-primary text-center text-white flex flex-col gap-8 shadow-md">
            <h3 className="text-lg font-bold">Expand Your Cloud Coverage</h3>
            <p>Unlock more storage, faster speeds, and premium features by upgrading your plan.</p>
            <Button className="cursor-pointer bg-white text-primary w-full text-lg py-5">Upgrade Plan</Button>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Quick Access</h3>
            {folders.map((folder) => (
              <div className="flex justify-between items-center w-full border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: folder.color }}>
                    <FolderIcon size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{folder.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {folder.size} GB * {folder.files} files
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </section>
  );
}
