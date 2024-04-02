"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { useEffect, useRef, useState } from "react";

export default function SuccessStripe() {
  const { clearCart } = useShoppingCart();
  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (typeof clearCart === "function") {
        clearCart();
        clearInterval(intervalRef.current!);
      }
    }, 100);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalRef.current!);
    }, 5000);

    return () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900">Payment Done!</h3>
          <p className="text-gray-600 my-2">
            Your payment has been successfully processed.
          </p>
          <p>Have a great day!</p>
          <Button
            asChild
            className="mt-5">
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
