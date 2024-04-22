"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { useWindowResizeListener } from "@/lib/hooks";
import { getPaginationVariables } from "@/lib/utils/utils";
import { useSearchParams } from "next/navigation";

type PaginationControlsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  category: string;
  per_page: string | string[];
  catCount: number;
  currentStyle?: string;
};

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
  category,
  per_page,
  catCount,
  currentStyle,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const pageNum = Number(page);
  const pages = Math.ceil(catCount / Number(per_page));

  const width = useWindowResizeListener();

  if (width === null) {
    return (
      <div className="w-full flex justify-center">
        <div className="rounded-lg h-10 w-[229px] 350px:w-[272px] md:w-[431px] lg:w-[523px] overflow-hidden relative">
          <div className="skeleton flex justify-between h-full" />
          <div className="absolute top-1 right-1 rounded-lg h-8 w-24 border border-yellow-600/50" />
          <div className="absolute top-1 left-1 rounded-lg h-8 w-24 border border-yellow-600/50" />
        </div>
      </div>
    );
  }

  const {
    jumpFirstActive,
    jumpSecondActive,
    showJumpSecond,
    showFirstEllipsis,
    showSecondEllipsis,
    jumpPenUltActive,
    showJumpPenUlt,
    jumpUltActive,
    sliceBegin,
    sliceEnd,
    pagSchema,
  } = getPaginationVariables(width, pageNum, pages);

  const baseUrl = `${!currentStyle ? category : currentStyle}`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="pr-1 300px:pr-2 350px:pr-0 ">
          <PaginationPrevious
            isActive={!hasPrevPage}
            href={`${baseUrl}/?page=${pageNum - 1}&per_page=${per_page}`}
            className={`${
              hasPrevPage ? "outline outline-1 outline-primary" : ""
            }`}
          />
        </PaginationItem>

        {pagSchema === "schema 5" || pages < 3 ? (
          <div className="hidden 350px:block text-sm px-2 font-semibold">
            {pageNum}
            <i className="px-1 text-muted-foreground font-medium">of</i>
            {pages}
          </div>
        ) : (
          <>
            <JumpLink
              baseUrl={baseUrl}
              page={1}
              per_page={per_page}
              jumpActive={jumpFirstActive}
            />

            {showJumpSecond && (
              <JumpLink
                baseUrl={baseUrl}
                page={2}
                per_page={per_page}
                jumpActive={jumpSecondActive}
              />
            )}
            {showFirstEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {Array(pages)
              .fill(null)
              .slice(sliceBegin, sliceEnd)
              .map((_, i) => {
                const pageIndex = sliceBegin + i + 1;
                const isActive = pageIndex === pageNum;
                return (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      className={`${
                        isActive ? "outline outline-1 outline-goldAccent" : ""
                      }`}
                      href={`${baseUrl}/?page=${pageIndex}&per_page=${per_page}`}
                      isActive={isActive}>
                      {pageIndex}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

            {showSecondEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {showJumpPenUlt && (
              <JumpLink
                baseUrl={baseUrl}
                jumpActive={jumpPenUltActive}
                per_page={per_page}
                page={pages - 1}
              />
            )}
            <JumpLink
              baseUrl={baseUrl}
              jumpActive={jumpUltActive}
              per_page={per_page}
              page={pages}
            />
          </>
        )}

        <PaginationItem className="pl-1 300px:pl-2 350px:pl-0 ">
          <PaginationNext
            isActive={!hasNextPage}
            href={`${baseUrl}/?page=${pageNum + 1}&per_page=${per_page}`}
            className={`${
              hasNextPage ? "outline outline-1 outline-primary" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

type JumpLinkProps = {
  per_page: string | string[];
  jumpActive: boolean;
  page: number;
  baseUrl: string;
};

function JumpLink({ per_page, jumpActive, page, baseUrl }: JumpLinkProps) {
  return (
    <PaginationItem>
      <PaginationLink
        href={`${baseUrl}/?page=${page}&per_page=${per_page}`}
        isActive={jumpActive}
        className={`${
          jumpActive ? "outline outline-1 outline-goldAccent" : ""
        }`}>
        {page}
      </PaginationLink>
    </PaginationItem>
  );
}
