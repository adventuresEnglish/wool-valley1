"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useSelectSizeContext } from "@/lib/hooks";
import { BasicProduct } from "../../../lib/types";
import { getSizeLabel, price_idLookup } from "@/lib/utils";
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

  useEffect(() => {
    if (size) {
      setPriceId(price_idLookup(name, size.toString()));
    }
  }, [size, name]);

  const product = {
    _id: _id,
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
    handleCartClick();
    addItem(product);
    console.log(product);
    setTimeout(() => {
      setSize("");
    }, 1000);
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