"use client";

import { userCartStore } from "@/store";
import { SearchParamType } from "@/types/SearchParamsType";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
  id,
  name,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const { addProduct } = userCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={added}
      className="my-12 btn btn-primary w-full"
    >
      {!added ? "Add To Cart" : "Adding To Cart 😀"}
    </button>
  );
}
