"use client";
import styles from "./page.module.css";
import { useFiltredProducts } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import { ProductSkeleton } from '@/app/ui/skeletons';

export default function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { query?: string };
}) {
  const category = params.category;
  const query = searchParams?.query || '';
  /*const category = "";
  const query = "";*/
  const { products, isLoading, isError } = useFiltredProducts(category, query);
  if (isError) return <div>failed to load</div>
  if (isLoading) return (
    <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
        {[...Array(12)].map((x, i) =>
          <ProductSkeleton key={i + 1}/>
        )}      
        </div>
    </main>
  )

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