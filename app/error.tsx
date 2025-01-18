'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="fixed inset-0 m-auto h-[200px] w-[300px] flex flex-col gap-y-3.5 items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="bg-primary rounded-lg border-0 text-white cursor-pointer text-sm px-3 py-2 tracking-wide select-none hover:bg-secondary transition-colors duration-200 ease-in-out"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}