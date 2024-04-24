"use client";

import { usePagination } from "@/lib/hooks";
import { useSearchParams } from "next/navigation";
import { createContext } from "react";

type PaginationContextProps = {
  activePage: number;
  setActivePage: (page: number) => void;
  pageNum: number;
};

export const PaginationContext = createContext<PaginationContextProps | null>(
  null
);

export default function PaginationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pageNum = Number(page);
  console.log("pageNum:", pageNum);

  const { activePage, setActivePage } = usePagination(pageNum);

  return (
    <PaginationContext.Provider
      value={{
        activePage,
        setActivePage,
        pageNum,
      }}>
      {children}
    </PaginationContext.Provider>
  );
}
