import React from "react";
import { Tile, Tag, AspectRatio, Button } from "@carbon/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "@/types/product";

type ProductCardProps = { product: Product };

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <Tile id={`tile-${product.id}`}>
      <AspectRatio ratio="4x3">
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 400px, max-height:400px) 100vw, 400px"
          className="product-image"
          priority
        />
      </AspectRatio>
      <h6 className="product-title">{product.title}</h6>
      <p>${product.price.toFixed(2)}</p>
      <Tag type="blue">{product.category}</Tag>
      <div>
        <Button
          kind="ghost"
          size="sm"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          View details
        </Button>
      </div>
    </Tile>
  );
}

export default ProductCard;
