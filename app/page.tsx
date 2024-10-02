"use client";
import styles from "./page.module.css";
import { useAllProducts } from '@/app/lib/data';
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import { ProductSkeleton } from '@/app/ui/skeletons';
import Link from 'next/link';

export default function Page() { 
  const { products, isLoading, isError } = useAllProducts();
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
            <Link key={product.id} href={`/product/${product.title}`}>
              <ProductCart key={index} product={product} />
            </Link>
          ))}
        </div>
    </main>
  );
}
