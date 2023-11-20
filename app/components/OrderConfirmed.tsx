import { motion } from "framer-motion";
import Image from "next/image";
import danceGiphy from "@/public/dance.gif";
import Link from "next/link";
import { userCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const { setPaymentIntent, clearCart, setOnCheckout, toggleCart } =
    userCartStore();
  useEffect(() => {
    setPaymentIntent("");
    clearCart();
  }, []);

  return (
    <motion.div
      className="flex flex-col justify-center items-center my-8"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="py-4 rounded-md text-center">
        <h1 className="text-xl font-medium">Your order has been placed 🚀</h1>
        <h2 className="my-4 text-sm">Check your email for the receipt.</h2>
        <Image src={danceGiphy} alt="dancing boy in rave" className="py-8W" />
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link href={"/dashboard"}>
          <button
            onClick={() => {
              setTimeout(() => {
                setOnCheckout("cart");
              }, 1000);
              toggleCart();
            }}
            className="py-2 px-4 mt-4 font-medium bg-teal-700 rounded-md text-white"
          >
            Check Your Order
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
