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
  const { products, isLoading, isError } = useFiltredProducts(category, query);
  if (isError) return <div>failed to load</div>
  if (isLoading) return (
    <main className={styles.mainContent}>

    </main>
  )

  return (
    <main className={styles.mainContent}>
      <h1>ses retard!!</h1>
    </main>
  );
}