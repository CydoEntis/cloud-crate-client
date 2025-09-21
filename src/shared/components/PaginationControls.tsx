import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";


type PaginationControlsProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

function PaginationControls({ page, pageSize, totalCount, onPageChange }: PaginationControlsProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const renderPages = () => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 1; 

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }

    return pages.map((p, idx) =>
      p === "ellipsis" ? (
        <PaginationItem key={`ellipsis-${idx}`}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={p} className="text-foreground cursor-pointer">
          <PaginationLink isActive={p === page} onClick={() => onPageChange(p)} size={undefined}>
            {p}
          </PaginationLink>
        </PaginationItem>
      )
    );
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious className="cursor-pointer text-foreground" onClick={() => onPageChange(page - 1)} size={undefined} />
          </PaginationItem>
        )}

        {renderPages()}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext className="cursor-pointer text-foreground" onClick={() => onPageChange(page + 1)} size={undefined} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationControls;
