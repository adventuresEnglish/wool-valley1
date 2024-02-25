"use client";

import { CartProvider as USCPRovider } from "use-shopping-cart";
import { ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCPRovider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      currency={"USD"}
      shouldPersist>
      {children}
    </USCPRovider>
  );
}
