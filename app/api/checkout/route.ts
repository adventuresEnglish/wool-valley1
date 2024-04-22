import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";
import { CartDetails } from "use-shopping-cart/core";

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;

const env = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(env);

export async function POST(req: Request) {
  const cartDetails: CartDetails = await req.json();

  const itemTotalValue = Object.values(cartDetails).reduce(
    (acc, item) => acc + item.value / 100,
    0
  );

  const shippingValue = Object.values(cartDetails).reduce(
    (acc, item) => acc + item.quantity * 10,
    0
  );

  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: (itemTotalValue + shippingValue).toFixed(2),

          breakdown: {
            item_total: {
              currency_code: "USD",
              value: itemTotalValue.toFixed(2),
            },
            discount: {
              currency_code: "USD",
              value: "0.00",
            },
            handling: {
              currency_code: "USD",
              value: "0.00",
            },
            insurance: {
              currency_code: "USD",
              value: "0.00",
            },
            shipping_discount: {
              currency_code: "USD",
              value: "0.00",
            },
            shipping: {
              currency_code: "USD",
              value: shippingValue.toFixed(2),
            },
            tax_total: {
              currency_code: "USD",
              value: "0.00",
            },
          },
        },
        items: Object.values(cartDetails).map((item) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          category: "PHYSICAL_GOODS",
          unit_amount: {
            currency_code: "USD",
            value: (item.price / 100).toFixed(2),
          }, // SHOULD I ALSO BE MULTIPLYING PRICE BY QUANTITY??????? yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyPPPPPPPPP
        })),
      },
    ],
  });

  const response = await client.execute(request);

  return NextResponse.json({
    id: response.result.id,
  });
}
// const itemTotalValue = Object.values(cartDetails)
//   .reduce((acc, item) => acc + item.value / 100, 0)
//   .toFixed(2);

// const shippingValue = Object.values(cartDetails)
//   .reduce((acc, item) => acc + item.quantity * 10, 0)
//   .toFixed(2);

// const purchase_units = [
//   {
//     amount: {
//       currency_code: "USD",
//       value: itemTotalValue + shippingValue,

//       breakdown: {
//         item_total: {
//           currency_code: "USD",
//           value: itemTotalValue,
//         },
//         discount: {
//           currency_code: "USD",
//           value: "0.00",
//         },
//         handling: {
//           currency_code: "USD",
//           value: "0.00",
//         },
//         insurance: {
//           currency_code: "USD",
//           value: "0.00",
//         },
//         shipping_discount: {
//           currency_code: "USD",
//           value: "0.00",
//         },
//         shipping: {
//           currency_code: "USD",
//           value: shippingValue,
//         },
//         tax_total: {
//           currency_code: "USD",
//           value: "0.00",
//         },
//       },
//       items: Object.values(cartDetails).map((item) => ({
//         name: item.name,
//         quantity: item.quantity,
//         category: "PHYSICAL_GOODS",
//         sku: item.id,
//         unit_amount: {
//           currency_code: "USD",
//           value: item.price / 100,
//         },
//       })),
//     },
//   },
// ];

// {
//   name: "T-Ball Glove",
//   quantity: "1",
//   category: "PHYSICAL_GOODS",
//   unit_amount: {
//     currency_code: "USD",
//     value: "59.99",
//   },
// },
// {
//   name: "T-Ball Bat",
//   quantity: "1",
//   category: "PHYSICAL_GOODS",
//   unit_amount: {
//     currency_code: "USD",
//     value: "12.00",
//   },
// },
// ],
