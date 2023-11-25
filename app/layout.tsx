// TODO Styles
import "./globals.css";

// TODO components
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Hydrate from "./components/Hydrate";
import Nav from "./components/Nav";
import { GeistSans } from "geist/font/sans";
import { Lobster_Two } from "next/font/google";
import { Metadata } from "next";

const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Styled NextJS 13 eCommerce",
    default: "Styled NextJS 13 eCommerce",
  },
  description:
    "Creating my first eCommerce next 13 app using prisma, stripe, framer-motion.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // fetching user
  const session = await getServerSession(authOptions);

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${lobster.variable} font-geistSans`}
    >
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
