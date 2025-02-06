import { CardWrapperSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';
import { AllCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

/**
 * Page Component
 * --------------
 * This component serves as a page where the list of products is displayed.
 * It uses React Suspense to load the `AllCardWrapper` component lazily.
 * If the content is still loading, it will show the `CardWrapperSkeleton` as a placeholder.
 *
 * @returns {JSX.Element} - The page component with suspended content.
 */
export default function Page() { 
  return ( 
    // Suspense component will show a fallback (CardWrapperSkeleton) until AllCardWrapper is loaded
    <Suspense fallback={<CardWrapperSkeleton />}>
      <AllCardWrapper /> {/* Render the list of all products once data is loaded */}
    </Suspense>
  );
}
