
import { getAllProducts } from '@/app/lib/data';
import CardWrapper from '@/app/ui/main/CardWrapper';
import { CardWrapperSkeleton } from '@/app/ui/main/CardWrapper';

export default async function Page() { 
  const products = await  getAllProducts();
  /*if (isError) return <div>products failed to load</div>
  if (isLoading) return <CardWrapperSkeleton />*/
  if (!products) return <div>products not found</div>

  return <CardWrapper products={products}/>;
}
