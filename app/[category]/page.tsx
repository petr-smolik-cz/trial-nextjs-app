import { CardWrapperSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';
import { CategoryCardWrapper, QueryCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

/**
 * Page Component
 * --------------
 * This component handles the dynamic fetching and rendering of product categories
 * or search results based on the provided `params` and `searchParams`.
 * It uses React Suspense to lazily load the content and shows a loading skeleton
 * until the appropriate data is loaded.
 *
 * @param {Object} params - Contains the `category` parameter to determine what to fetch.
 * @param {Object} searchParams - Contains the `query` parameter to filter search results.
 * 
 * @returns {JSX.Element} - The page component, which will render category or search results.
 */
export default async function Page({
  params: paramsPromise,       // Treat params as a Promise, which contains the category
  searchParams: searchParamsPromise, // Treat searchParams as a Promise, which contains the search query
}: {
  params: Promise<{ category: string }>; // Ensure params is a Promise containing a category
  searchParams?: Promise<{ query?: string }>; // Ensure searchParams is a Promise containing a query (optional)
}) {
  // Await params and searchParams to resolve the promises and extract values
  const params = await paramsPromise; 
  const searchParams = await searchParamsPromise;

  // Destructure category and query from params and searchParams
  const category = params?.category || '';  // Default to empty string if category doesn't exist
  const query = searchParams?.query || '';  // Default to empty string if query doesn't exist

  console.log("Starting fetching process for category: " + category + " and query: " + query);

  let CardWrapper; // This will hold the appropriate CardWrapper component based on category or query

  // Determine which CardWrapper to display based on category or query
  if (category && category !== 'search') {
    // If there's a category (and it's not 'search'), render CategoryCardWrapper
    CardWrapper = <CategoryCardWrapper category={category} />;
  } else if (query) {
    // If there's a query, render QueryCardWrapper
    CardWrapper = <QueryCardWrapper query={query} />;
  } else {
    // If neither category nor query is provided, throw an error
    throw new Error('No category or query provided');
  }

  return ( 
    // Wrap the selected CardWrapper component in Suspense with a fallback skeleton loader
    <Suspense fallback={<CardWrapperSkeleton />}>
      {CardWrapper} {/* Render the selected CardWrapper component */}
    </Suspense>
  );
}
