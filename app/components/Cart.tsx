import { userCartStore } from "@/store";
import Image from "next/image";

export default function Cart() {
  const cartStore = userCartStore();
  console.log(cartStore.isOpen);

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}
