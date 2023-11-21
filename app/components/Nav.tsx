"use client";

import Image from "next/image";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Cart from "./Cart";
import { userCartStore } from "@/store";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import Hydrate from "./Hydrate";

export default function Nav({ user }: Session) {
  const cartStore = userCartStore();

  return (
    <>
      <ProgressBar
        height="4px"
        color="#0d9488"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <nav className="flex justify-between items-center py-12">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">Styled</h1>
        </Link>
        <ul className="flex items-center gap-8">
          <li
            onClick={cartStore.toggleCart}
            className="flex items-center text-3xl relative cursor-pointer"
          >
            <AiFillShopping />
            <AnimatePresence>
              <Hydrate className="hidden">
                {cartStore.cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex justify-center items-center"
                  >
                    {cartStore.cart.length}
                  </motion.span>
                )}
              </Hydrate>
            </AnimatePresence>
          </li>
          {!user && (
            <li>
              <button
                onClick={() => signIn()}
                className="bg-teal-600 text-white py-2 px-4 rounded-md"
              >
                Sign In
              </button>
            </li>
          )}

          {!!user && (
            <>
              <li>
                <Link href="/dashboard">
                  <Image
                    className="rounded-full"
                    src={user?.image as string}
                    alt={user?.name as string}
                    width={36}
                    height={36}
                  />
                </Link>
              </li>
              <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
                <button onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>

        <Hydrate className="hidden">
          <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
        </Hydrate>
      </nav>
    </>
  );
}
