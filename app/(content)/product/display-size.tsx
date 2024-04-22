"use client";

import { useSelectSizeContext } from "@/lib/hooks";
import { getSizeLabel } from "@/lib/utils/utils";

export default function DisplaySize() {
  const { size } = useSelectSizeContext();

  return (
    <span className="text-xs text-gray-500">{size && getSizeLabel(size)}</span>
  );
}
