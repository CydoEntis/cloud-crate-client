import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

export default function FilePagination({ page, pageSize, totalCount, onPageChange }: Props) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="mt-4 flex justify-between items-center px-4 pb-4">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="space-x-2">
        <Button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
