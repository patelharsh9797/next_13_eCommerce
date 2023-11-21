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
        color="#4A00FF"
        options={{ showSpinner: false }}
        shallowRouting
      />

      <nav className="flex justify-between items-center py-12">
        <Link href={"/"}>
          <h1 className="font-bold text-xl italic">Styled</h1>
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
                    className="bg-primary text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex justify-center items-center"
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
                className="bg-primary text-white py-2 px-4 rounded-md"
              >
                Sign In
              </button>
            </li>
          )}

          {!!user && (
            <>
              <li className="pr-4">
                <div className="dropdown dropdown-end cursor-pointer">
                  <Image
                    src={user?.image as string}
                    alt={user?.name as string}
                    width={36}
                    height={36}
                    tabIndex={0}
                    className="rounded-full  ring-2 ring-offset-2 ring-primary"
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content p-4 menu space-y-2 shadow bg-base-100 rounded-box w-72"
                  >
                    <li>
                      <Link
                        className="hover:bg-base-300 p-4 rounded-md text-center"
                        href="/dashboard"
                        onClick={() => {
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                          }
                        }}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur();
                          }
                        }}
                        className="bg-primary text-white hover:bg-base-300 p-4 rounded-md text-center"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
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
