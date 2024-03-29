import { userCartStore } from "@/store";
import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import Basket from "@/public/emptyCart.png";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "@/app/components/Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const {
    toggleCart,
    cart,
    addProduct,
    removeProduct,
    onCheckout,
    setOnCheckout,
  } = userCartStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.unit_amount! * item.quantity!,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={toggleCart}
      className="fixed w-full h-screen left-0 top-0 bg-black/50 "
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-200 absolute right-0 top-0 w-full lg:w-2/5 h-screen p-12 overflow-y-auto"
      >
        {onCheckout === "cart" && (
          <button
            onClick={toggleCart}
            className="text-sm font-bold p-2 mb-12 underline"
          >
            Back To Store 🏃‍♂️
          </button>
        )}

        {onCheckout === "checkout" && (
          <button
            onClick={() => setOnCheckout("cart")}
            className="text-sm font-bold p-2 mb-12 underline"
          >
            Check Your Cart 🛒
          </button>
        )}

        {onCheckout === "cart" &&
          cart.map((item) => (
            <motion.div
              layout
              className="flex p-4 my-4 rounded-lg gap-4 bg-base-100"
              key={`cartItem-${item.id}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className={"rounded-md w-auto h-24 shadow"}
              />

              <div>
                <h2>{item.name}</h2>
                <div className="flex items-center gap-2">
                  <h2>Quantity: {item.quantity}</h2>
                  <button onClick={() => removeProduct(item)}>
                    <IoRemoveCircle className="text-primary w-4 h-4" />
                  </button>
                  <button onClick={() => addProduct(item)}>
                    <IoAddCircle className="text-primary w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm">
                  {item.unit_amount && formatPrice(item.unit_amount)}
                </p>
              </div>
            </motion.div>
          ))}

        {onCheckout === "checkout" && <Checkout />}
        {onCheckout === "success" && <OrderConfirmed />}

        {cart.length > 0 && onCheckout === "cart" && (
          <motion.div layout className="mt-12">
            <p>Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => setOnCheckout("checkout")}
              className="py-2 mt-4 bg-primary w-full rounded-md text-white"
            >
              Checkout
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {!cart.length && onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 font-medium text-2xl pt-36 opacity-75"
            >
              <h1>Uhhh ohhh...it's empty 😢</h1>
              <Image src={Basket} alt="empty cart" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
