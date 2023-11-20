import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { AddCartType } from "@/types/AddCartType";
import { prisma } from "@/utils/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity!,
    0
  );

  return totalPrice;
};

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
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
    },
    amount: calculateOrderAmount(items),
    currency: "usd",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        quantity: item.quantity,
      })),
    },
  };

  if (payment_intent_id) {
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: calculateOrderAmount(items),
        }
      );

      const existing_order = await prisma.order.findFirst({
        where: {
          paymentIntentID: updated_intent.id,
        },
        include: {
          products: true,
        },
      });

      if (!existing_order) {
        return res.status(400).json({ message: "Invalid Payment Intent" });
      }

      const updated_order = await prisma.order.update({
        where: {
          id: existing_order.id,
        },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              quantity: item.quantity,
            })),
          },
        },
      });

      return res.status(200).json({ paymentIntent: updated_intent.id });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    orderData.paymentIntentID = paymentIntent.id;

    const newOrder = await prisma.order.create({
      data: orderData,
    });
    return res.status(200).json({ paymentIntent });
  }
}
