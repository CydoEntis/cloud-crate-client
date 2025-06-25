import { createFileRoute } from "@tanstack/react-router";
import { FileText, MoreHorizontal, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileCard } from "@/features/files/components/FileCard";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateDetailPage,
});

function CrateDetailPage() {
  const { crateId } = Route.useParams();

  return (
    <section className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Crate Controls Will Go Here</h2>
        {/* Add buttons/filters/etc here */}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Files</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <FileCard filename={""} />
        </div>
      </div>
    </section>
  );
}
