import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

const Product = ({
  id,
  name,
  unit_amount,
  image,
  description,
  metadata,
}: ProductType) => {
  const { features } = metadata;
  return (
    <Link
      href={{
        pathname: `/product/${id}`,
        query: { id, name, unit_amount, image, description, features },
      }}
    >
      <div>
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-96 object-cover rounded-lg"
          priority
        />

        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-primary">
            {unit_amount ? formatPrice(unit_amount) : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
