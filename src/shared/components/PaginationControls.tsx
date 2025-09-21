import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "./ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationAlignment = "left" | "center" | "right";

type PaginationControlsProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  align?: PaginationAlignment;
  className?: string;
};

function PaginationControls({
  page,
  pageSize,
  totalCount,
  onPageChange,
  align = "center",
  className = "",
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const getAlignmentClass = (alignment: PaginationAlignment) => {
    switch (alignment) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      case "center":
      default:
        return "justify-center";
    }
  };

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
        <PaginationItem key={p}>
          <Button
            variant={p === page ? "default" : "outline"}
            onClick={() => onPageChange(p)}
            className={`h-9 w-9 ${
              p === page 
                ? "bg-primary text-foreground hover:bg-primary/90" 
                : ""
            }`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </Button>
        </PaginationItem>
      )
    );
  };

  return (
    <div className={`mt-4 ${className}`}>
      <nav role="navigation" aria-label="pagination" className={`mx-auto flex w-full ${getAlignmentClass(align)}`}>
        <ul className="flex flex-row items-center gap-1">
          {page > 1 && (
            <li>
              <Button
                variant="ghost"
                onClick={() => onPageChange(page - 1)}
                className="h-9 px-3 gap-1"
                aria-label="Go to previous page"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
            </li>
          )}

          {renderPages()}

          {page < totalPages && (
            <li>
              <Button
                variant="ghost"
                onClick={() => onPageChange(page + 1)}
                className="h-9 px-3 gap-1"
                aria-label="Go to next page"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default PaginationControls;