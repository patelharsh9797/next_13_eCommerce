import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import {ProductType} from "@/types/ProductType";


const Product = ({name,price,image}:ProductType) => {
    return (
        <div>
            <Image src={image} alt={name} width={400} height={400} />
            <h1>{name} - {price ? formatPrice(price) : "N/A"}</h1>
        </div>
    )
}

export default Product