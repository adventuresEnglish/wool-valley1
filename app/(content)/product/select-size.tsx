"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectSizeContext } from "@/lib/hooks";

import { cn, getSizeCategory } from "@/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SelectSize({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const preselectedSize = searchParams.get("size");
  const { size, setSize, chooseSizeIndicator } = useSelectSizeContext();

  const sizeCategories = getSizeCategory(category);

  useEffect(() => {
    if (preselectedSize) {
      setSize(preselectedSize);
    }
  }, [preselectedSize, setSize]);

  const handleValueChange = (value: string) => {
    setSize(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("size", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      required={true}
      value={size}
      defaultValue={size}
      onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn("w-36", className, {
          "ring-primary ring-2 animate-select-size-scale": chooseSizeIndicator,
        })}>
        <SelectValue placeholder="Choose a Size" />
      </SelectTrigger>
      <SelectContent
        className="max-h-[220px]"
        sideOffset={5}>
        {sizeCategories.map((sizeCategory) => (
          <SelectGroup key={sizeCategory.label}>
            <SelectLabel>{sizeCategory.label} Sizes</SelectLabel>
            {sizeCategory.sizes.map((size) => (
              <SelectItem
                key={size._key}
                value={size._key}>
                {size.eu}{" "}
                <span className="text-muted-foreground">{`(US ${size.us})`}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
