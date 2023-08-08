import Image from "next/image";

interface ProductProps {
    name:string
    price:string
    image:string
}

const Product = ({name,price,image}:ProductProps) => {
    return (
        <div>
            <Image src={image} alt={name} width={400} height={400} />
            <h1>{name} - {price}</h1>
        </div>
    )
}

export default Product