"use client";

import { useState, useEffect } from "react";
import { userCartStore } from "@/store";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import CheckoutForm from "./CheckoutForm";
import { motion } from "framer-motion";
import OrderAnimation from "./OrderAnimation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const cartStore = userCartStore();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Create a paymentIntent is as soon as page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
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
        cartStore.setPaymentIntent(data.paymentIntent.id);
      })
      .catch((e) => console.log("checkoutError:", e));
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    <div>
      {!clientSecret && <OrderAnimation />}
      {clientSecret && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </motion.div>
      )}
    </div>
  );
}
