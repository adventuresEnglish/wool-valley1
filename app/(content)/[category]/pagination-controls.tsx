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
import { usePaginationContext, useWindowResizeListener } from "@/lib/hooks";
import { cn, getPaginationVariables } from "@/lib/utils/utils";
import { useEffect, useMemo, useState } from "react";

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
  const { pageNum } = usePaginationContext();
  const pages = Math.ceil(catCount / Number(per_page));

  const width = useWindowResizeListener();

  let pagSchema: string | undefined;
  if (width) {
    if (width < 490) {
      pagSchema = "schema 5";
    } else if (width < 1024) {
      pagSchema = "schema 7";
    } else if (width > 1024) {
      pagSchema = "schema 9";
    }
  }

  if (pages == 2 || pagSchema === "schema 5") {
    return (
      <PaginationBase
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        per_page={per_page}
        pages={pages}
        baseUrl={baseUrl}>
        <div className="hidden 350px:block text-sm px-2 font-semibold">
          {pageNum}
          <i className="px-1 text-muted-foreground font-medium">of</i>
          {pages}
        </div>
      </PaginationBase>
    );
  }

  if (pagSchema === undefined) {
    return <LoadingLine />;
  }
  return (
    <PaginationBase
      hasNextPage={hasNextPage}
      hasPrevPage={hasPrevPage}
      per_page={per_page}
      pages={pages}
      baseUrl={baseUrl}>
      <MediumAndLargePagination
        pagSchema={pagSchema}
        pageNum={pageNum}
        pages={pages}
        baseUrl={baseUrl}
        per_page={per_page}
      />
    </PaginationBase>
  );
}

type PaginationBaseProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  per_page: string | string[];
  baseUrl: string;
  children: React.ReactNode;
  pages: number;
};

function PaginationBase({
  hasNextPage,
  hasPrevPage,
  per_page,
  baseUrl,
  children,
  pages,
}: PaginationBaseProps) {
  const { activePage, setActivePage, pageNum } = usePaginationContext();

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
                console.log("active", activePage);
              }}
            />
          </PaginationItem>
          {children}
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

type MediumAndLargePaginationProps = {
  pagSchema: string;
  pageNum: number;
  pages: number;
  baseUrl: string;
  per_page: string | string[];
};

function MediumAndLargePagination({
  pagSchema,
  pageNum,
  pages,
  baseUrl,
  per_page,
}: MediumAndLargePaginationProps) {
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

  return (
    <>
      <JumpLink
        id="jumpFirst"
        baseUrl={baseUrl}
        page={1}
        per_page={per_page}
      />

      {showJumpSecond && (
        <JumpLink
          id="jumpSecond"
          baseUrl={baseUrl}
          page={2}
          per_page={per_page}
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
            <JumpLink
              key={pageIndex}
              id={`jump${pageIndex}`}
              baseUrl={baseUrl}
              per_page={per_page}
              page={pageIndex}
            />
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
          baseUrl={baseUrl}
          per_page={per_page}
          page={pages - 1}
        />
      )}
      <JumpLink
        id="jumpUlt"
        baseUrl={baseUrl}
        per_page={per_page}
        page={pages}
      />
    </>
  );
}

type JumpLinkProps = {
  per_page: string | string[];
  page: number;
  baseUrl: string;
  id: string;
  //outlineColor?: string;
  key?: number;
};

function JumpLink({
  per_page,
  page,
  baseUrl,
  id,
  //outlineColor = "goldAccent",
  key,
}: JumpLinkProps) {
  const { activePage, setActivePage } = usePaginationContext();
  const active = activePage === page;

  return (
    <PaginationItem
      id={id}
      key={key}>
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
