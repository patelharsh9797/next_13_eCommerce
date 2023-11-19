import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AddCartType } from "@/types/AddCartType";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: AddCartType[]) =>
  items.reduce((acc, item) => acc + item.unit_amount! * item.quantity!, 0);

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get User
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not logged in" });
    return;
  }

  //   Extract data from request body
  const { items, payment_intent_id } = req.body;

  // create order data

  const orderData = {
    user: {
      connect: { id: userSession.user?.id },
      amount: calculateOrderAmount(items),
      currency: "usd",
      status: "pending",
      paymentIntentId: payment_intent_id,
      products: {
        create: items.map((item) => ({
          name: item.name,
          description: item.description,
          unit_amount: item.unit_amount,
          quantity: item.quantity,
        })),
      },
    },
  };

  return res.status(200).json({ userSession });
}
