import { CardWrapperSkeleton } from '@/app/ui/skeletons';
import { CategoryCardWrapper, QueryCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { query?: string };
}) {
  const category = params.category;
  const query = searchParams?.query || '';

  console.log("Starting fetching process for category: " + category + " and query: " + query);

  let CardWrapper;

  if (category && category !== 'search') {
    CardWrapper = <CategoryCardWrapper category={category} />;
  } else if (query) {
    CardWrapper = <QueryCardWrapper query={query} />;
  }  else {
    throw new Error('No category or query provided');
  }

  /*if (isError) return <div>failed to load</div>
  if (isLoading) return <CardWrapperSkeleton />
  if (!products) return <div>products not found</div>*/

  return ( 
    <Suspense fallback={<CardWrapperSkeleton />}>
      {CardWrapper}
    </Suspense>
  );
}