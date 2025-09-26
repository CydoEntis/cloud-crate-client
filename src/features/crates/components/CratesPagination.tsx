import type { CrateSummary } from "@/features/crates/crateTypes";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import type { PaginatedResult } from "@/shared/lib/sharedTypes";

type CratesPaginationProps = {
  crates: PaginatedResult<CrateSummary>;
  onPageChange: (page: number) => void;
};

function CratesPagination({ crates, onPageChange }: CratesPaginationProps) {
  if (crates.totalCount <= crates.pageSize) return null;

  return (
    <PaginationControls
      page={crates.page}
      pageSize={crates.pageSize}
      totalCount={crates.totalCount}
      onPageChange={onPageChange}
      aria-label="Crates pagination"
    />
  );
}
export default CratesPagination;
