// TODO Styles
import "./globals.css";

// TODO components
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Hydrate from "./components/Hydrate";
import Nav from "./components/Nav";
import { GeistSans } from "geist/font/sans";
import { Lobster_Two } from "next/font/google";

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
