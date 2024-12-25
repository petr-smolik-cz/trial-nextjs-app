
import CardWrapper from '@/app/ui/main/CardWrapper';
import { CardWrapperSkeleton } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

export default function Page() { 
  
  /*if (isError) return <div>products failed to load</div>
  if (isLoading) return <CardWrapperSkeleton />
  if (!products) return <div>products not found</div>*/
  
  return ( 
    <Suspense fallback={<CardWrapperSkeleton />}>
      <CardWrapper/>
    </Suspense>
  );
}
