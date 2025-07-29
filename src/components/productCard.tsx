import React from "react";
import { Tile, Tag, AspectRatio, Link as CarbonLink } from "@carbon/react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type ProductCardProps = { product: Product };

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Tile id={`tile-${product.id}`} className="product-tile">
      <AspectRatio ratio="16x9">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
      </AspectRatio>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <Tag type="blue">{product.category}</Tag>
      <div className="product-actions">
        <CarbonLink
          href={`/product/${product.id}`}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/product/${product.id}`);
          }}
        >
          View details
        </CarbonLink>
      </div>
    </Tile>
  );
}

export default ProductCard;
