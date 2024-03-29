import Product from "@/app/components/Product";
import Stripe from "stripe";

const getProduct = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  const products = await stripe.products.list();
  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      const features = product.metadata.Features || "";

      return {
        id: product.id,
        name: product.name,
        unit_amount: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
        description: product.description,
        metadata: { features },
      };
    })
  );

  return productWithPrices;
};

export default async function Home() {
  const products = await getProduct();

  return (
    <main className="grid grid-cols-fluid gap-16 pb-8">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </main>
  );
}
