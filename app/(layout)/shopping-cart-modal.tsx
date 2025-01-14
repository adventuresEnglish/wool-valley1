"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { useSelectSizeContext } from "@/lib/hooks";
import { useShoppingCart } from "use-shopping-cart";
import { cn, formatCurrency, getSizeLabel } from "@/lib/utils/utils";
import { useEffect, useRef, useState } from "react";

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD",
  intent: "capture",
};

export default function ShoppingCartModal() {
  //const handleCheckoutClick = useHandleCheckoutClick();
  const { setSize } = useSelectSizeContext();
  const [showRemove, setShowRemove] = useState(true);
  const {
    cartCount,
    cartDetails,
    removeItem,
    totalPrice,
    addItem,
    shouldDisplayCart,
    handleCartClick,
  } = useShoppingCart();

  const shouldDisplayCartRef = useRef(shouldDisplayCart);

  useEffect(() => {
    shouldDisplayCartRef.current = shouldDisplayCart;
  }, [shouldDisplayCart]);

  return (
    <>
      {shouldDisplayCart && (
        <button
          className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-[60] cursor-default"
          onClick={() => {
            handleCartClick();
          }}
        />
      )}
      <Sheet
        modal={false}
        open={shouldDisplayCart}
        onOpenChange={() => {
          setShowRemove(true);
          handleCartClick();
        }}>
        <SheetContent className="sm:max-w-lg w-[90vw] z-[80]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          <div className="h-full flex flex-col justify-between overflow-y-auto">
            <div className="mt-8 flex-1 overflow-y-auto min-h-24">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartCount === 0 ? (
                  <h1 className="py-6">You don&apos;t have any items</h1>
                ) : (
                  <>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li
                        key={entry.id}
                        className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={entry.image as string}
                            alt="Product Image"
                            layout="responsive"
                            width={100}
                            height={100}
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{entry.displayName}</h3>
                              <p className="ml-4">
                                {formatCurrency(entry.price)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {entry.description}
                            </p>
                          </div>

                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              QTY: {entry.quantity}
                            </p>
                            <p className="text-gray-500">
                              Size: {getSizeLabel(entry.size)}
                            </p>

                            <button
                              disabled={!showRemove}
                              type="button"
                              onClick={() => {
                                if (cartCount! - entry.quantity === 0) {
                                  handleCartClick();
                                }
                                removeItem(entry.id);
                                setSize("");
                                toast(
                                  `You removed ${entry.displayName} from your cart.`,
                                  {
                                    icon: "🗑️",
                                    cancelButtonStyle: {
                                      background: "#7c3aed",
                                      color: "#fff",
                                    },
                                    cancel: {
                                      label: "Undo",
                                      onClick: () => {
                                        addItem(entry);
                                        if (!shouldDisplayCartRef.current) {
                                          handleCartClick();
                                        }
                                      },
                                    },
                                    position: "top-right",
                                  }
                                );
                              }}
                              className={cn("font-medium text-gray-300", {
                                "text-primary hover:text-primary/80":
                                  showRemove,
                              })}>
                              remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal:</p>
                <p>{formatCurrency(totalPrice ?? 0)}</p>
              </div>
              <div className="mt-6">
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    disabled={cartCount === 0}
                    onClick={() => setShowRemove(false)}
                    style={{
                      color: "silver",
                    }}
                    createOrder={async () => {
                      const res = await fetch("/api/checkout", {
                        method: "POST",
                        body: JSON.stringify(cartDetails),
                      });
                      const order = await res.json();
                      console.log("order", order);
                      return order.id;
                    }}
                    onApprove={async (data, actions) => {
                      console.log("data", data);
                      await actions.order?.capture();
                    }}
                    onCancel={(data) => {
                      console.log("cancelled", data);
                      setShowRemove(true);
                    }}
                    onError={(err) => {
                      console.log("error", err);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  {cartCount ? "or " : ""}
                  <button
                    onClick={() => {
                      handleCartClick();
                    }}
                    className="font-medium text-primary hover:text-primary/80">
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
