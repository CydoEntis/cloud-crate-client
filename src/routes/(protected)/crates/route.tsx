import CrateTable from "@/features/crates/components/CrateTable";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import { useGetUserCrates } from "@/features/crates/hooks/queries/useGetUserCrates";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/crates")({
  component: CratesPage,
});

function CratesPage() {
  const { data, isLoading } = useGetUserCrates();
  console.log(data);
  if (isLoading) return <p>Loading crates...</p>;

  return (
    <div className="space-y-12 p-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">My Crates</h2>
        <CrateTable data={data?.owned ?? []} columns={crateTableColumns} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Joined Crates</h2>
        <CrateTable data={data?.joined ?? []} columns={crateTableColumns} />
      </section>
    </div>
  );
}

export default CratesPage;
