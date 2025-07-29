"use client";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/reduxHooks";
import { Grid, Column, Tile, Tag, Button } from "@carbon/react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === Number(id))
  );

  if (!product)
    return (
      <Grid
        fullWidth
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "3rem",
        }}
      >
        <Column lg={8} md={6} sm={4}>
          <p>Product not found.</p>
          <Button
            kind="secondary"
            onClick={() => router.back()}
            style={{ marginTop: "2rem" }}
          >
            Back
          </Button>
        </Column>
      </Grid>
    );

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingBottom: "3rem",
      }}
    >
      {/* Back button at top right */}
      <Button
        kind="ghost"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          zIndex: 10,
        }}
      >
        &larr; Back
      </Button>
      <Grid
        fullWidth
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "3rem", 
          paddingBottom: "3rem", 
        }}
      >
        <Column
          lg={6}
          md={8}
          sm={4}
          style={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tile
            className="product-tile"
            style={{
              padding: "2rem",
              textAlign: "center",
              width: "100%",
              maxWidth: 480,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="product-image-wrapper"
              style={{
                width: "100%",
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
                style={{
                  maxHeight: "200px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <h2 className="product-title" style={{ marginTop: 0 }}>
              {product.title}
            </h2>
            <p
              className="product-price"
              style={{ fontWeight: "bold", margin: "1rem 0" }}
            >
              ${product.price.toFixed(2)}
            </p>
            <Tag type="blue" style={{ marginBottom: "1.5rem" }}>
              {product.category}
            </Tag>
            <div
              className="product-description"
              style={{
                marginTop: "1.5rem",
                textAlign: "left",
                width: "100%",
              }}
            >
              {product.description}
            </div>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
}
