import { createFileRoute } from "@tanstack/react-router";
import { FileText, MoreHorizontal, MoreVertical, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileCard } from "@/features/files/components/FileCard";
import { FileCardList } from "@/features/files/components/FileCardList";
import BucketStorage from "@/features/bucket/BucketStorage";
import { ImageUpload } from "@/components/ImageUpload";
import FileTable from "@/components/FileTable";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId } = Route.useParams();

  return (
    <section className="">
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-2xl font-semibold">Test Crate</h3>
        <Button variant="outline" className="cursor-pointer">
          <Settings /> Settings
        </Button>
      </div>
      <div className="mb-4">
        {/* Add buttons/filters/etc here */}
        <BucketStorage />
        <ImageUpload />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Files</h3>
        <FileCardList />
        <FileTable />
      </div>
    </section>
  );
}
