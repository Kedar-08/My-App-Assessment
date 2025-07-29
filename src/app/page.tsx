"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setProducts } from "@/redux/productSlice";
import ProductCard from "@/components/productCard";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { Grid, Column, Search, Heading, Loading } from "@carbon/react";

export default function HomePage() {
  const [localItems, setLocalItems] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get<Product[]>(
        "https://fakestoreapi.com/products"
      );
      setLocalItems(res.data);
      dispatch(setProducts(res.data)); // Store in Redux for global access
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  const filtered = useMemo(() => {
    if (!query.trim()) return localItems;
    return localItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, localItems]);

  if (loading) {
    return (
      <div style={{ marginTop: "4rem" }}>
        <Loading active description="Loading products..." withOverlay />
      </div>
    );
  }

  return (
    <>
      <Heading className="page-heading">MiniStore</Heading>
      <div className="search-bar">
        <Search
          labelText="Search products"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="md"
        />
      </div>
      <Grid className="product-grid" fullWidth>
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <Column key={product.id} lg={4} md={4} sm={2}>
              <div onClick={() => router.push(`/product/${product.id}`)}>
                <ProductCard product={product} />
              </div>
            </Column>
          ))
        ) : (
          <Column sm={4} md={8} lg={16}>
            <p className="no-products-message">No products found.</p>
          </Column>
        )}
      </Grid>
    </>
  );
}
