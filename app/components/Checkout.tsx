"use client";

import { useState, useEffect } from "react";
import { userCartStore } from "@/store";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const { cart, paymentIntent, setPaymentIntent } = userCartStore();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Create a paymentIntent is as soon as page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart,
        payment_intent_id: paymentIntent,
      }),
    })
      .then((res) => {
        //set client secret and the payment intent associated with it
        if (res.status === 403) {
          return router.push("/api/auth/signin");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.paymentIntent.client_secret);
        setPaymentIntent(data.paymentIntent.id);
      });
  }, []);

  return (
    <div>
      <h1>Checkout Page - {clientSecret}</h1>
    </div>
  );
}
