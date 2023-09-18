"use client";

import { userCartStore } from "@/store";
import { SearchParamType } from "@/types/SearchParamsType";
import { AddCartType } from "@/types/AddCartType";

export default function AddCart({
  id,
  name,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const { addProduct } = userCartStore();

  return (
    <button
      onClick={() => addProduct({ id, name, image, unit_amount, quantity })}
      className="my-12 text-white py-2 px-6 rounded-md bg-teal-700 font-medium font"
    >
      Add To Cart
    </button>
  );
}
