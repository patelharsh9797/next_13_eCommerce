"use client";

import Image from "next/image";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Nav({ user }: Session) {
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1>Styled</h1>
      </Link>
      <ul className="flex items-center gap-12">
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
