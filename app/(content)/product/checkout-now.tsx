"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { BasicProduct } from "../../../lib/types";
import { useHandleCheckoutClick, useSelectSizeContext } from "@/lib/hooks";
import { motion } from "framer-motion";
import { price_idLookup } from "@/lib/utils/utils";
import { useEffect, useState } from "react";

export default function CheckoutNow({
  description,
  imageUrl,
  name,
  price,
  _id,
  slug,
}: BasicProduct) {
  const { addItem, cartCount, handleCartClick } = useShoppingCart();
  const handleCheckoutClick = useHandleCheckoutClick();

  const { size } = useSelectSizeContext();
  const [price_id, setPriceId] = useState("");
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    if (size) {
      setPriceId(price_idLookup(name, size));
    }
  }, [size, name]);

  function buyNow(e: any) {
    addItem(product);
    handleCartClick();
    setLastEvent(e);
  }

  useEffect(() => {
    if (cartCount === 1 && lastEvent) {
      handleCheckoutClick(lastEvent);
    }
  }, [cartCount, lastEvent, handleCheckoutClick]);

  const product = {
    _id: _id,
    name: name,
    description: description,
    price: price,
    currency: "USD",
    image: imageUrl,
    id: price_id,
    size: size,
    slug: slug,
  };

  return (
    <>
      {size && !cartCount && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          transition={{ duration: 1, ease: "easeInOut" }}>
          <div className="flex flex-row items-center">
            <p className="hidden 350px:block my-2 ml-2 mr-4 text-gray-500">
              or
            </p>
            <Button
              disabled={!size || (cartCount && cartCount > 0) ? true : false}
              className="disabled:opacity-0 bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 border border-yellow-600 hover:from-yellow-100/80 hover:via-yellow-200/80 hover:to-yellow-100/80 hover:border-yellow-600/80 hover:text-black/90"
              variant="ghost"
              onClick={(e) => buyNow(e)}>
              Checkout Now
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}
