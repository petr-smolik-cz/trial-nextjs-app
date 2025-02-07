import { CardWrapperSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';
import { CategoryCardWrapper, QueryCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

/**
 * Page Component
 * --------------
 * Dynamically fetches and displays either:
 * - A product category page (if `category` is provided).
 * - A search results page (if `query` is provided).
 * 
 * If neither is available, an error is thrown.
 */
export default async function Page({
  params: paramsPromise, // Promise that resolves to the category parameter
  searchParams: searchParamsPromise, // Promise that resolves to search query (optional)
}: {
  params: Promise<{ category: string }>; // Expected category param
  searchParams?: Promise<{ query?: string }>; // Expected query param (optional)
}) {
  // Resolve params and searchParams promises
  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;

  // Extract values with fallbacks
  const category = params?.category || ''; // Default to empty if undefined
  const query = searchParams?.query || ''; // Default to empty if undefined

  console.log(`Fetching products for category: ${category}, query: ${query}`);

  let CardWrapper; // Holds the appropriate component

  // Determine which component to render
  if (category && category !== 'search') {
    // If a category is provided (and it's not "search"), show category results
    CardWrapper = <CategoryCardWrapper category={category} />;
  } else if (query) {
    // If a search query is provided, show search results
    CardWrapper = <QueryCardWrapper query={query} />;
  } else {
    // If neither category nor query exists, throw an error
    throw new Error('No category or query provided');
  }

  return (
    // Suspense wraps the content to show a fallback skeleton while loading
    <Suspense fallback={<CardWrapperSkeleton />}>
      {CardWrapper} {/* Render the selected component */}
    </Suspense>
  );
}
