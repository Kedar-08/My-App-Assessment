"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setProducts } from "@/redux/productSlice";
import ProductCard from "@/components/productCard";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import {
  Grid,
  Column,
  Stack,
  Search,
  Heading,
  Loading,
  FlexGrid,
} from "@carbon/react";

export default function HomePage() {
  const [localItems, setLocalItems] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect((): void => {
    const fetchProducts = async (): Promise<void> => {
      setLoading(true);
      const res = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      setLocalItems(res.data);
      dispatch(setProducts(res.data));
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  const filtered = useMemo<Product[]>(() => {
    if (!query.trim()) return localItems;
    return localItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, localItems]);

  if (loading) {
    return <Loading active description="Loading products..." withOverlay />;
  }

  return (
    <FlexGrid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <Stack gap={6}>
          <Heading className="page-heading">MiniStore</Heading>
          <Search
            className="search-bar-wrapper"
            labelText="Search products"
            placeholder="Search products"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            size="md"
          />
          {filtered.length > 0 ? (
            <Grid fullWidth className="product-grid">
              {filtered.map((product) => (
                <Column key={product.id} lg={4} md={4} sm={2}>
                  <ProductCard product={product} />
                </Column>
              ))}
            </Grid>
          ) : (
            <p className="no-products-message">No products found.</p>
          )}
        </Stack>
      </Column>
    </FlexGrid>
  );
}
