"use client";
import { useAllProducts } from '@/app/lib/data';
import CardWrapper from '@/app/ui/main/CardWrapper';
import { CardWrapperSkeleton } from '@/app/ui/main/CardWrapper';

export default function Page() { 
  const { products, isLoading, isError } = useAllProducts();
  if (isError) return <div>failed to load</div>
  if (isLoading) return <CardWrapperSkeleton />
  
  return <CardWrapper products={products}/>;
}
