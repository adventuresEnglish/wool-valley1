import { stripe } from "../lib/stripe";
import { headers } from "next/headers";
import {
  validateCartItems,
  formatLineItems,
  ValidatedItem,
} from "use-shopping-cart/utilities";

export async function POST(request: Request) {
  const cartDetail = await request.json();
  console.log(cartDetail);
  const inventory = require("@/sanity/json/stripe_products.json");
  const validatedItems: ValidatedItem[] = validateCartItems(
    inventory,
    cartDetail
  );
  console.log(validatedItems);
  let line_items;
  if (validatedItems) {
    line_items = formatLineItems(cartDetail);
  } else {
    console.error("Error validating cart items");
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items,
    success_url: `${headers().get("origin")}/stripe/success`,
    cancel_url: `${headers().get("origin")}/`,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    // payment_intent_data: {
    //   metadata: {
    //     _id: cartDetails._id,
    //     size: cartDetails.size,
    //     url: `woolvalley.co/product/${cartDetails.slug}`,
    //     image: cartDetails.image,
    //   },
    //   statement_descriptor: `${cartDetails.name} - ${cartDetails.size}`,
    //   description: `${cartDetails.name} - ${cartDetails.size}`,
    // },
  });
  return Response.json({ sessionId: checkoutSession.id });
}
