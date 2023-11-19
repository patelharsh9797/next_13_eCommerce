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
      <div className="text-gray-700">
        <Image
          src={image}
          alt={name}
          width={800}
          height={800}
          className="w-full h-96 object-cover rounded-lg"
        />

        <div className="font-medium py-2">
          <h1>{name}</h1>
          <h2 className="text-sm text-teal-700">
            {unit_amount ? formatPrice(unit_amount) : "N/A"}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Product;
