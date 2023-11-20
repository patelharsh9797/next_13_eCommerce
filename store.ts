import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "@/types/AddCartType";

type OnCheckOutEnum = "cart" | "checkout" | "success";

type CartState = {
  isOpen: boolean;
  paymentIntent: string;
  onCheckout: OnCheckOutEnum;
  cart: AddCartType[];
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  setPaymentIntent: (val: string) => void;
  setOnCheckout: (val: OnCheckOutEnum) => void;
};

export const userCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      onCheckout: "cart",
      paymentIntent: "",
      setOnCheckout: (val) => set((state) => ({ onCheckout: val })),
      setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set((state) => ({ cart: [] })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity! + 1,
                    }
                  : cartItem
              ),
            };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem && existingItem.quantity! > 1) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity! - 1,
                    }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
            };
          }
        }),
    }),
    {
      name: "cart-store",
    }
  )
);
