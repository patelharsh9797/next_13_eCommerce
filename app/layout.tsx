// TODO Styles
import "./globals.css";

// TODO components
import Nav from "./components/Nav";
import { GeistSans } from "geist/font/sans";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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
      <body className={`mx-4 lg:mx-24 ${GeistSans.className}`}>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </body>
    </html>
  );
}
