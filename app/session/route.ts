import { stripe } from "../lib/stripe";
import { headers } from "next/headers";
import { validateCartItems } from "use-shopping-cart/utilities";
import { client } from "../lib/sanity";

export async function POST(request: Request) {
  const inventory = await client.fetch(`*[_type == "product"] {
    "id": price_id,
      name,
      price,
      currency,
  }`);
  const cartProducts = await request.json();
  const line_items = validateCartItems(inventory, cartProducts);
  console.log("line_items", line_items);
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    line_items,
    success_url: `${headers().get("origin")}/stripe/success`,
    cancel_url: `${headers().get("origin")}/`,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
  });
  return Response.json({ sessionId: checkoutSession.id });
}
// successUrl="http://localhost:3000/stripe/success"
// cancelUrl="http://localhost:3000/stripe/error"
