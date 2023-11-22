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
      status: "complete",
    },
    include: {
      products: true,
    },
    orderBy: {
      createdDate: "desc",
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
    <div className="font-medium space-y-8 pb-8">
      {orders.map((order) => (
        <div
          className="rounded-lg p-8 bg-base-200 grid md:grid-cols-2 gap-8"
          key={order.id}
        >
          <div className="space-y-2">
            <h2 className="text-sm font-medium">
              Order reference : {order.id}
            </h2>

            <p className="text-sm">
              Time : {new Date(order.createdDate).toLocaleString()}
            </p>

            <p className="text-sm">
              <span>Status : </span>
              <span
                className={`${
                  order.status === "complete"
                    ? "badge-primary"
                    : "badge-warning"
                } badge text-xs`}
              >
                {order.status}
              </span>
            </p>

            <p className="font-medium pt-4">
              Total : {formatPrice(order.amount)}
            </p>
          </div>

          <div className="text-sm lg:flex flex-wrap items-start gap-8">
            {order.products.map((product) => (
              <div className="space-y-2" key={product.id}>
                <h3>{product.name}</h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={product.image!}
                    width={80}
                    height={80}
                    alt={product.name}
                    priority
                    className="rounded-md shadow-md"
                  />
                  <p>{formatPrice(product.unit_amount)}</p>
                  <p>Quantity : {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
