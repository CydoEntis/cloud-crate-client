import { columns, payments } from "../features/bucket/columns";
import type { Payment } from "../features/bucket/columns";
import { Settings } from "lucide-react";
import { ImageUpload } from "~/components/ImageUpload";
import PageHeader from "~/components/PageHeader";
import { Button } from "~/components/ui/button";
import { DataTable } from "~/features/bucket/FileTable";
import type { Route } from "./+types/files";

export async function clientLoader(): Promise<Payment[]> {
  return payments;
}


const FilesPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <section>
      <PageHeader
        title="Placeholder Bucket Name"
        description="This is just placeholder for now"
        actions={
          <Button variant="outline" className="rounded-lg">
            <Settings className="text-indigo-600" />
          </Button>
        }
      />
      <ImageUpload />
      <DataTable columns={columns} data={loaderData} />
    </section>
  );
};

export default FilesPage;
