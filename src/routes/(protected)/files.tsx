import { Settings } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/files")({
  component: FilesPage,
});

function FilesPage() {
  return (
    <section>
      <PageHeader
        title="Images Crate"
        description="A crate to store all images"
        actions={
          <Button variant="outline" className="rounded-lg">
            <Settings className="text-indigo-600" />
          </Button>
        }
      />
      {/* <ImageUpload /> */}
      {/* <DataTable columns={columns} data={payments} /> */}
    </section>
  );
}

export default FilesPage;
