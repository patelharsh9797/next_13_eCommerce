// TODO Styles
import "./globals.css";

// TODO components
import Nav from "./components/Nav";
import { Roboto, Lobster_Two } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata = {
  title: "NextJS 13 eCommerce web site",
  description:
    "Creating my first eCommerce next app using stripe, framer-motion.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // fetching user
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`mx-4 lg:mx-24 ${roboto.className}`}>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </body>
    </html>
  );
}
