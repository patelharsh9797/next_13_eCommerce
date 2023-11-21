import { authOptions } from "@/pages/api/auth/[...nextauth]";
import formatPrice from "@/utils/PriceFormat";
import { prisma } from "@/utils/prisma";
import { Order } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const revalidate = 0;

const fetchOrders = async () => {
  const sesh = await getServerSession(authOptions);

  if (!sesh) {
    return redirect("/api/auth/signin?callbackUrl=/dashboard");
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: sesh?.user?.id,
    },
    include: {
      products: true,
    },
  });

  return orders;
};

export default async function DashboardPage() {
  const orders = await fetchOrders();

  if (orders.length === 0)
    return (
      <div>
        <h1>No order placed yet 😟</h1>
        <h2>Place any order to get going homie!!</h2>
      </div>
    );

  return (
    <div className="font-medium grid grid-cols-fluid gap-16">
      {orders.map((order) => (
        <div className="rounded-lg p-8 space-y-2 bg-slate-400" key={order.id}>
          <h2 className="text-xs font-medium">Order reference : {order.id}</h2>

          <p className="text-xs">
            Time : {new Date(order.createdDate).toLocaleString()}
          </p>

          <p className="text-xs">
            Status :{" "}
            <span
              className={`${
                order.status === "complete" ? "bg-teal-500" : "bg-orange-500"
              } text-white py-1 rounded-md px-2 mx-2 text-sm`}
            >
              {order.status}
            </span>
          </p>

          <div className="text-sm lg:flex items-start gap-4">
            {order.products.map((product) => (
              <div className="py-2" key={product.id}>
                <h3 className="py-2">{product.name}</h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={product.image!}
                    width={64}
                    height={64}
                    alt={product.name}
                    priority
                  />
                  <p>{formatPrice(product.unit_amount)}</p>
                  <p>Quantity : {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-medium">Total : {formatPrice(order.amount)}</p>
        </div>
      ))}
    </div>
  );
}
