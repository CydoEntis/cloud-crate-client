import PageHeader from "@/components/PageHeader";
import SectionOverview from "@/components/SectionOverview";
import { Button } from "@/components/ui/button";
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
    },
    {
      id: 2,
      name: "Wedding",
    },
    {
      id: 3,
      name: "Design",
    },
    {
      id: 4,
      name: "Baby Shower",
    },
    {
      id: 5,
      name: "School notes",
    },
    {
      id: 6,
      name: "Blueprints",
    },
  ];

  const files = [
    {
      id: 1,
      name: "Invoice December 2025",
      size: "267 KB",
      extension: ".pdf",
      icon: <File size={28} />,
    },
    {
      id: 2,
      name: "House Blueprint",
      size: "267 KB",
      extension: ".pdf",
      icon: <Image size={28} />,
    },
    {
      id: 3,
      name: "Wedding Photo",
      size: "267 KB",
      extension: ".png",
      icon: <Image size={28} />,
    },
    {
      id: 4,
      name: "School Essay",
      size: "267 KB",
      extension: ".docx",
      icon: <File size={28} />,
    },
    {
      id: 5,
      name: "Mortgage",
      size: "267 KB",
      extension: ".pdf",
      icon: <File size={28} />,
    },
    {
      id: 6,
      name: "Preschool Photo",
      size: "267 KB",
      extension: ".jpg",
      icon: <Image size={28} />,
    },
  ];

  return (
    <section>
      <PageHeader title="Welcome back, Demo User" actions={headerActions} />
      <main className="flex flex-col gap-8">
        <SectionOverview title="Folders">
          {folders.map((folder) => (
            <div className="flex justify-between items-center w-[300px] border rounded-xl p-2 shadow-sm bg-gray-50">
              <div className="flex items-center gap-2">
                <FolderIcon size={20} />
                <p>{folder.name}</p>
              </div>
              <MoreVertical size={20} />
            </div>
          ))}
        </SectionOverview>
        <SectionOverview title="Recent Files">
          {files.map((file) => (
            <div className="flex justify-between items-center w-[300px] border rounded-xl p-2 shadow-sm">
              <div className="flex items-center gap-2 w-full">
                <div className="bg-gray-100 p-4 rounded-xl">{file.icon}</div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-md">{file.name}</h3>
                    <MoreVertical size={20} />
                  </div>
                  <p className="text-gray-500 text-sm">
                    {file.size} - {file.extension}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </SectionOverview>
      </main>

      {/* <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-64 border">
          <div className="flex-1 p-4 bg-yellow-100">
            <p className="text-lg font-semibold text-yellow-900">Main content here</p>
            <p>Stuff inside the card body</p>
          </div>

          <div className="bg-yellow-300 p-4 text-sm text-yellow-900 border-t mt-auto">Footer content</div>
        </div>
      </div> */}
    </section>
  );
}
