// src/components/PaginationComponent.tsx

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface LinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationMeta {
  last_page: number;
  links: LinkItem[];
}

interface PaginationComponentProps {
  meta: PaginationMeta | undefined;
  onPageChange: (page: number) => void;
}

export const PaginationComponent = ({
  meta,
  onPageChange,
}: PaginationComponentProps) => {
  // Sembunyikan pagination jika tidak ada meta atau halamannya hanya 1
  if (!meta || meta.last_page <= 1) return null;

  const getPageNumber = (url: string | null) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return Number(urlObj.searchParams.get("page"));
  };

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {meta.links.map((link: LinkItem, index: number) => {
          const targetPage = getPageNumber(link.url);

          if (link.label.includes("Previous")) {
            return (
              <PaginationItem key={index}>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (targetPage) onPageChange(targetPage);
                  }}
                  className={!link.url ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            );
          }

          if (link.label.includes("Next")) {
            return (
              <PaginationItem key={index}>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (targetPage) onPageChange(targetPage);
                  }}
                  className={!link.url ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            );
          }

          if (link.label === "...") {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={link.active}
                onClick={(e) => {
                  e.preventDefault();
                  if (targetPage) onPageChange(targetPage);
                }}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
