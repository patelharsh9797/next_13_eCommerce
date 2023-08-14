import Image from "next/image";
import { SearchParamType } from "@/types/SearchParamsType";
import PriceFormat from "@/utils/PriceFormat";

export default async function Product({ searchParams }: SearchParamType) {
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        height={600}
        width={600}
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {searchParams.unit_amount && PriceFormat(searchParams.unit_amount)}
          </p>
        </div>

        <button className="my-12 text-white py-2 px-6 rounded-md bg-teal-700 font-medium">
          Add to cart
        </button>
      </div>
    </div>
  );
}
