"use client";

import { useSelectSize } from "@/lib/hooks";
import { createContext } from "react";

type SelectSizeContextProps = {
  size: string | undefined;
  setSize: (selectedSize: string | undefined) => void;
  chooseSizeIndicator: boolean;
  setChooseSizeIndicator: (chooseSizeIndicator: boolean) => void;
};

export const SelectSizeContext = createContext<SelectSizeContextProps | null>(
  null
);

export default function SelectSizeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { size, setSize, chooseSizeIndicator, setChooseSizeIndicator } =
    useSelectSize();

  return (
    <SelectSizeContext.Provider
      value={{
        chooseSizeIndicator,
        setChooseSizeIndicator,
        size,
        setSize,
      }}>
      {children}
    </SelectSizeContext.Provider>
  );
}
