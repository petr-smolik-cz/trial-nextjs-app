import { CardWrapperSkeleton } from '@/app/ui/skeletons/mainPageSkeletons';
import { AllCardWrapper } from '@/app/ui/main/CardWrapper';
import { Suspense } from 'react';

export default function Page() { 
  return ( 
    <Suspense fallback={<CardWrapperSkeleton />}>
      <AllCardWrapper/>
    </Suspense>
  );
}
