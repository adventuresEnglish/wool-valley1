"use client";

import { Action, useLocalStorage } from "@/lib/hooks";
import { Product } from "@/lib/types";
import { createContext } from "react";

type FavoritesContextProps = {
  value: Product[];
  dispatch: React.Dispatch<Action>;
  length: number;
  isItemIncluded: (id: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextProps | null>(
  null
);

export default function FavoritesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, dispatch, length, isItemIncluded } = useLocalStorage(
    "favorites",
    []
  );

  return (
    <FavoritesContext.Provider
      value={{
        value,
        dispatch,
        length,
        isItemIncluded,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
}
