import PaginationControls from "@/shared/components/PaginationControls";
import type { PaginatedResult } from "@/features/auth/authTypes";
import type { CrateSummary } from "@/features/crates/crateTypes";

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
