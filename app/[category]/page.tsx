"use client";
import styles from "./page.module.css";
import { useCategoryProducts } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';

export default function Page({ params }: { params: { category: string } }) {
  const category = params.category;
  const { products, isLoading, isError } = useCategoryProducts(category);
  if (isError) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return (
    <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
          {products.map((product: Product, index: number) => (
            <ProductCart key={index} product={product} />
          ))}
        </div>
    </main>
  );
}