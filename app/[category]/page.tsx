"use client";
import { useFiltredProducts } from '@/app/lib/data';
import CardWrapper from '@/app/ui/main/CardWrapper';
import { CardWrapperSkeleton } from '@/app/ui/main/CardWrapper';

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
  if (isLoading) return <CardWrapperSkeleton />

  return (
    <CardWrapper products={products}/>
  );
}