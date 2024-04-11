import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId =
  "AXucHmGQJfB5HTA1sDPBFgEoTWHRj0ZhNsxb0Zn3oseLzJI0DiPZglRJeFoyinC7H9idRZP7NjwArC1z";
const clientSecret =
  "EDQSOR5K-GXiPHGVPa9qrBvja8urNrhdWQRKFxFAmgGbkOAny0h_h5PbYg4oWJ6UjdaxbQuiXCBia5yp";

const env = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(env);

export async function POST() {
  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
        description: "This is the payment description",
      },
    ],
  });

  const response = await client.execute(request);
  console.log(response);

  return NextResponse.json({
    id: response.result.id,
  });
}
