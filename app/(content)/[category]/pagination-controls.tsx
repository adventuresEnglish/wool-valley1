"use client";

import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type PaginationControlsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  category: string;
  per_page: string | string[];
  catCount: number;
};

export default function PaginationControls({
  hasNextPage,
  hasPrevPage,
  category,
  per_page,
  catCount,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const pageNum = Number(page);
  const pages = Math.ceil(catCount / Number(per_page));

  const width = useWindowResizeListener();
  let pagSchema = "schema 9";
  if (width < 1024) {
    pagSchema = "schema 7";
  }
  if (width < 490) {
    pagSchema = "schema 5";
  }

  const jumpFirstActive = pageNum == 1;
  const jumpSecondActive = pageNum == 2;
  const showJumpSecond =
    (pageNum <= 4 && pagSchema === "schema 9") ||
    (pageNum <= 3 && pagSchema === "schema 7");
  const showFirstEllipsis =
    (pageNum > 4 && pagSchema === "schema 9") ||
    (pageNum > 3 && pagSchema === "schema 7");

  const showSecondEllipsis =
    (pageNum < pages - 3 && pagSchema === "schema 9") ||
    (pageNum < pages - 2 && pagSchema === "schema 7");
  const jumpPenUltActive = pageNum == pages - 1;
  const showJumpPenUlt =
    (pageNum >= pages - 3 && pagSchema === "schema 9") ||
    (pageNum >= pages - 2 && pagSchema === "schema 7");
  const jumpUltActive = pageNum == pages;

  let sliceBegin = 0;
  if (pagSchema === "schema 9") {
    sliceBegin = pageNum - 2;
    if (sliceBegin >= pages - 5) sliceBegin = pages - 5;
  }
  if (pagSchema === "schema 7") {
    sliceBegin = pageNum - 1;
    if (sliceBegin >= pages - 3) sliceBegin = pages - 3;
  }
  if (sliceBegin < 2) sliceBegin = 2;

  let sliceEnd = 0;
  if (pagSchema === "schema 9") {
    sliceEnd = pageNum + 1;
    if (sliceEnd < 5) sliceEnd = 5;
  }
  if (pagSchema === "schema 7") {
    sliceEnd = pageNum;
    if (sliceEnd < 3) sliceEnd = 3;
  }
  if (sliceEnd >= pages - 2) sliceEnd = pages - 2;

  return (
    <Pagination className="-mt-2 mb-8">
      <PaginationContent>
        <PaginationItem className="pr-1 300px:pr-2 350px:pr-0 ">
          <PaginationPrevious
            isActive={!hasPrevPage}
            href={`${category}/?page=${pageNum - 1}&per_page=${per_page}`}
            className={`${
              hasPrevPage ? "outline outline-1 outline-primary" : ""
            }`}
          />
        </PaginationItem>

        {pagSchema === "schema 5" ? (
          <div className="hidden 350px:block text-sm px-2 font-semibold">
            {pageNum}
            <i className="px-1 text-muted-foreground font-medium">of</i>
            {pages}
          </div>
        ) : (
          <>
            <JumpLink
              category={category}
              page={1}
              per_page={per_page}
              jumpActive={jumpFirstActive}
            />

            {showJumpSecond && (
              <JumpLink
                category={category}
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
                console.log("i", i);
                const pageIndex = sliceBegin + i + 1;
                const isActive = pageIndex === pageNum;
                return (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      className={`${
                        isActive ? "outline outline-1 outline-goldAccent" : ""
                      }`}
                      href={`${category}/?page=${pageIndex}&per_page=${per_page}`}
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
                category={category}
                jumpActive={jumpPenUltActive}
                per_page={per_page}
                page={pages - 1}
              />
            )}
            <JumpLink
              category={category}
              jumpActive={jumpUltActive}
              per_page={per_page}
              page={pages}
            />
          </>
        )}

        <PaginationItem className="pl-1 300px:pl-2 350px:pl-0 ">
          <PaginationNext
            isActive={!hasNextPage}
            href={`${category}/?page=${pageNum + 1}&per_page=${per_page}`}
            className={`${
              hasNextPage ? "outline outline-1 outline-primary" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

//   let sliceBegin =
//     pageNum - 2 >= pages - 5 ? pages - 5 : pageNum - 2 < 2 ? 2 : pageNum - 2;
//   let sliceEnd =
//     pageNum + 1 >= pages - 2 ? pages - 2 : pageNum + 1 < 5 ? 5 : pageNum + 1;

type JumpLinkProps = {
  category: string;
  per_page: string | string[];
  jumpActive?: boolean;
  page: number;
};

function JumpLink({ category, per_page, jumpActive, page }: JumpLinkProps) {
  return (
    <PaginationItem>
      <PaginationLink
        href={`${category}/?page=${page}&per_page=${per_page}`}
        isActive={jumpActive}
        className={`${
          jumpActive ? "outline outline-1 outline-goldAccent" : ""
        }`}>
        {page}
      </PaginationLink>
    </PaginationItem>
  );
}
