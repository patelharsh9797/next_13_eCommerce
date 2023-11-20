import { AddCartType } from "@/types/AddCartType";

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(amount / 100);
};

export const calculateOrderAmount = (items: AddCartType[]) =>
  items.reduce((acc, item) => acc + item.unit_amount! * item.quantity!, 0);

export default formatPrice;
