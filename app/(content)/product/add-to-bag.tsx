"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useBlurNavContext, useSelectSizeContext } from "@/lib/hooks";
import { BasicProduct } from "../../../lib/types";
import { getSizeLabel, price_idLookup } from "@/lib/utils/utils";
import { useEffect, useState } from "react";

export default function AddToBag({
  description,
  imageUrl,
  name,
  price,
  _id,
  slug,
}: BasicProduct) {
  const { addItem, handleCartClick } = useShoppingCart();

  const { size, setSize, setChooseSizeIndicator } = useSelectSizeContext();
  const [priceId, setPriceId] = useState("");
  const { setBlurNav } = useBlurNavContext();

  useEffect(() => {
    if (size) {
      setPriceId(price_idLookup(name, size.toString()));
    }
  }, [size, name]);

  const product = {
    _id: _id,
    displayName: name,
    name: `${name}, ${getSizeLabel(size!)}`,
    description: description,
    price: price,
    currency: "USD",
    image: imageUrl,
    id: priceId,
    size: size,
    slug: slug,
  };

  const handleClick = () => {
    addItem(product);
    handleCartClick();
    setTimeout(() => {
      setSize("");
    }, 1000);
    setBlurNav(true);
  };

  return (
    <div
      onMouseEnter={() => {
        if (!size) {
          setChooseSizeIndicator(true);
        }
      }}
      onMouseLeave={() => {
        if (!size) {
          setChooseSizeIndicator(false);
        }
      }}>
      <Button
        disabled={!size}
        onClick={handleClick}>
        Add to Cart
      </Button>
    </div>
  );
}
