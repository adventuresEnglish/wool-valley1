"use client";

import LoadingLine from "@/app/components/loading-line";
import LoadingSpinner from "@/app/components/loading-spinner";
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
import { cn, getPagSchema, getPaginationVariables } from "@/lib/utils/utils";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

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
  const baseUrl = `${!currentStyle ? category : currentStyle}`;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageNum = Number(page);
  const [activePage, setActivePage] = useState(pageNum);
  const pages = Math.ceil(catCount / Number(per_page));
  const width = useWindowResizeListener();
  const pagSchema = getPagSchema(width);
  const {
    showJumpSecond,
    showFirstEllipsis,
    sliceBegin,
    sliceEnd,
    showSecondEllipsis,
    showJumpPenUlt,
  } = useMemo(
    () =>
      getPaginationVariables(
        pagSchema as "schema 7" | "schema 9",
        pageNum,
        pages
      ),
    [pagSchema, pageNum, pages]
  );

  if (pagSchema === undefined) {
    return <LoadingLine />;
  }

  return (
    <>
      {activePage !== pageNum && <LoadingSpinner />}
      <Pagination>
        <PaginationContent>
          <PaginationItem className="pr-1 300px:pr-2 350px:pr-0 ">
            <PaginationPrevious
              isActive={!hasPrevPage}
              href={`${baseUrl}/?page=${pageNum - 1}&per_page=${per_page}`}
              className={`${
                hasPrevPage ? "outline outline-1 outline-primary" : ""
              }`}
              onClick={(e) => {
                if (activePage > 1) {
                  setActivePage(activePage - 1);
                } else {
                  e.preventDefault();
                }
              }}
            />
          </PaginationItem>
          {pages == 2 || pagSchema === "schema 5" ? (
            <div className="hidden 350px:block text-sm px-2 font-semibold">
              {pageNum}
              <i className="px-1 text-muted-foreground font-medium">of</i>
              {pages}
            </div>
          ) : (
            <>
              <JumpLink
                id="jumpFirst"
                page={1}
                per_page={per_page}
                baseUrl={baseUrl}
                activePage={activePage}
                setActivePage={setActivePage}
              />

              {showJumpSecond && (
                <JumpLink
                  id="jumpSecond"
                  page={2}
                  baseUrl={baseUrl}
                  per_page={per_page}
                  activePage={activePage}
                  setActivePage={setActivePage}
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
                  return (
                    <div key={pageIndex}>
                      <JumpLink
                        id={`jump${pageIndex}`}
                        page={pageIndex}
                        baseUrl={baseUrl}
                        per_page={per_page}
                        activePage={activePage}
                        setActivePage={setActivePage}
                      />
                    </div>
                  );
                })}

              {showSecondEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {showJumpPenUlt && (
                <JumpLink
                  id="jumpPenUlt"
                  page={pages - 1}
                  per_page={per_page}
                  baseUrl={baseUrl}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              )}
              <JumpLink
                id="jumpUlt"
                page={pages}
                per_page={per_page}
                baseUrl={baseUrl}
                activePage={activePage}
                setActivePage={setActivePage}
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
              onClick={(e) => {
                if (activePage < pages) {
                  setActivePage(activePage + 1);
                } else {
                  e.preventDefault();
                }
                console.log("active", activePage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

//_________________________________________________________________________________________________//

type JumpLinkProps = {
  per_page: string | string[];
  page: number;
  baseUrl: string;
  id: string;
  activePage: number;
  setActivePage: (page: number) => void;
};

function JumpLink({
  per_page,
  page,
  baseUrl,
  id,
  activePage,
  setActivePage,
}: JumpLinkProps) {
  const active = activePage === page;

  return (
    <PaginationItem id={id}>
      <PaginationLink
        href={`${baseUrl}/?page=${page}&per_page=${per_page}`}
        isActive={active}
        className={cn("", {
          "outline outline-1 outline-goldAccent": active,
          // [`outline outline-1 outline-${outlineColor}`]: active,
        })}
        onClick={() => setActivePage(page)}>
        {page}
      </PaginationLink>
    </PaginationItem>
  );
}
