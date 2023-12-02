"use client";

import { userCartStore } from "@/store";
import formatPrice, { calculateOrderAmount } from "@/utils/PriceFormat";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { cart, setOnCheckout } = userCartStore();

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          setOnCheckout("success");
          // router.refresh();
        }
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <PaymentElement id="payment-element" />
      <h1 className="mt-4 py-4 font-bold text-sm">
        Total : {formatPrice(calculateOrderAmount(cart))}
      </h1>
      <button
        id="submit"
        disabled={isLoading || !stripe || !elements}
        className="py-2 bg-primary w-full rounded-md text-white disabled:opacity-50"
      >
        <span id="button-text">
          {isLoading ? <span>Processing 👀</span> : <span>Pay Now 🔥</span>}
        </span>
      </button>
    </form>
  );
}
