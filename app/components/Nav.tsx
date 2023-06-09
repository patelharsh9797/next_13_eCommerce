"use client";

import Image from "next/image";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

export default function Nav({ user }: Session) {
  return (
    <nav className="flex justify-between items-center py-8">
      <h1>Styled</h1>
      <ul className="flex items-center gap-12">
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign In</button>
          </li>
        )}
        {!!user && (
          <>
            <li>
              <Image
                className="rounded-full"
                src={user?.image as string}
                alt={user?.name as string}
                width={48}
                height={48}
              />
            </li>
            <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
              <button onClick={() => signOut()}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
