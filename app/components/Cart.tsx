import { userCartStore } from "@/store";
import Image from "next/image";
import formatPrice from "@/public/utils/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import Basket from "@/public/emptyCart.png";

export default function Cart() {
  const { toggleCart, cart, addProduct, removeProduct } = userCartStore();

  return (
    <div
      onClick={toggleCart}
      className="fixed w-full h-screen left-0 top-0 bg-black/50 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-auto text-gray-700"
      >
        <h1>Here's your shopping list 📃</h1>

        {cart.map((item) => (
          <div className="flex p-4 gap-4" key={`cartItem-${item.id}`}>
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className={"rounded-md h-24"}
            />

            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2">
                <h2>Quantity: {item.quantity}</h2>
                <button onClick={() => removeProduct(item)}>
                  <IoRemoveCircle />
                </button>
                <button onClick={() => addProduct(item)}>
                  <IoAddCircle />
                </button>
              </div>
              <p className="text-sm">
                {item.unit_amount && formatPrice(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <button className="py-2 mt-12 bg-teal-700 w-full rounded-md text-white">
            Checkout
          </button>
        )}
        {!cart.length && (
          <div className="flex flex-col items-center gap-12 font-medium text-2xl pt-56 opacity-75">
            <h1>Uhhh ohhh...it's empty 😢</h1>
            <Image src={Basket} alt="empty cart" width={200} height={200} />
          </div>
        )}
      </div>
    </div>
  );
}
