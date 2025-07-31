import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";

type PaginationControlsProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

export const PaginationControls = ({ page, pageSize, totalCount, onPageChange }: PaginationControlsProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={i === page} onClick={() => onPageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if ((i === 2 && page > 3) || (i === totalPages - 1 && page < totalPages - 2)) {
        pages.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => onPageChange(page - 1)} disabled={page === 1} />
        </PaginationItem>

        {renderPages()}

        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(page + 1)} disabled={page === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
