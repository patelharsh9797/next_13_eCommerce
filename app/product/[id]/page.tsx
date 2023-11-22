import Image from "next/image";
import { SearchParamType } from "@/types/SearchParamsType";
import PriceFormat from "@/utils/PriceFormat";
import AddCart from "@/app/product/[id]/AddCart";

export default async function Product({
  params: { id },
  searchParams,
}: SearchParamType) {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-16  pb-12">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        height={600}
        width={600}
        className="rounded-lg w-full shadow-md"
        priority
      />
      <div className="font-medium ">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-primary">
            {searchParams.unit_amount && PriceFormat(searchParams.unit_amount)}
          </p>
        </div>

        <AddCart
          id={id}
          image={searchParams.image}
          name={searchParams.name}
          unit_amount={searchParams.unit_amount}
        />
      </div>
    </div>
  );
}
