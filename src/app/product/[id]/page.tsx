"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/reduxHooks";
import { Grid, Column, Tile, Tag, Button, Stack } from "@carbon/react";
import Image from "next/image";
import type { Product } from "@/types/product";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = useAppSelector((state) =>
    state.products.products.find((p: Product) => p.id === Number(id))
  );

  if (!product)
    return (
      <Grid fullWidth className="center-vertical">
        <Column lg={8} md={6} sm={4}>
          <p>Product not found.</p>
          <Button kind="secondary" onClick={() => router.back()}>
            Back
          </Button>
        </Column>
      </Grid>
    );

  return (
    <Grid fullWidth className="center-vertical">
      <Column lg={8} md={8} sm={4}>
        <Stack gap={7}>
          <Button kind="tertiary" onClick={() => router.back()}>
            &larr; Back
          </Button>
          <Tile>
            <div className="product-image-wrapper">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 600px) 100vw, 800px"
                className="product-image"
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Tag type="blue">{product.category}</Tag>
            <div className="product-description">{product.description}</div>
          </Tile>
        </Stack>
      </Column>
    </Grid>
  );
}
