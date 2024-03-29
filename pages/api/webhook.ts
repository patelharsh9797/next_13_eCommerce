import Stripe from "stripe";
import { prisma } from "@/utils/prisma";
import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) return res.status(400).send("Missing stripe signature!");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res.status(400).send("Webhook error" + error);
  }

  switch (event.type) {
    case "payment_intent.created":
      const paymentIntent = event.data.object;
      console.log("Payment Intent is created.");
      break;

    case "charge.succeeded":
      const charge = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        const order = await prisma.order.update({
          where: {
            paymentIntentID: charge.payment_intent,
          },
          data: {
            status: "complete",
          },
        });
      }
      revalidatePath("/dashboard");
      console.log("charge is succeeded.");
      break;

    default:
      console.log("Unhandled Event Type : " + event.type);
  }
}
