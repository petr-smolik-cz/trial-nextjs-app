import { CardWrapperSkeleton } from '@/app/ui/skeletons';
import { AllCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

export default function Page() { 
  
  /*if (isError) return <div>products failed to load</div>
  if (isLoading) return <CardWrapperSkeleton />
  if (!products) return <div>products not found</div>*/
  
  return ( 
    <Suspense fallback={<CardWrapperSkeleton />}>
      <AllCardWrapper/>
    </Suspense>
  );
}
