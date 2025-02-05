import { CardWrapperSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';
import { CategoryCardWrapper, QueryCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

export default async function Page({
  params: paramsPromise,       // Treat params as a Promise
  searchParams: searchParamsPromise, // Treat searchParams as a Promise
}: {
  params: Promise<{ category: string }>; // Ensure params is a Promise
  searchParams?: Promise<{ query?: string }>; // Ensure searchParams is a Promise
}) {
  const params = await paramsPromise; // Await params
  const searchParams = await searchParamsPromise; // Await searchParams

  const category = params?.category || '';
  const query = searchParams?.query || '';

  console.log("Starting fetching process for category: " + category + " and query: " + query);

  let CardWrapper;

  if (category && category !== 'search') {
    CardWrapper = <CategoryCardWrapper category={category} />;
  } else if (query) {
    CardWrapper = <QueryCardWrapper query={query} />;
  } else {
    throw new Error('No category or query provided');
  }

  return ( 
    <Suspense fallback={<CardWrapperSkeleton />}>
      {CardWrapper}
    </Suspense>
  );
}
