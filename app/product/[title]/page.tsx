import { getSingleProduct } from '@/app/lib/data';
import ProductGallery from '@/app/ui/productDetail/ProductGallery';
import ProductInfo from '@/app/ui/productDetail/ProductInfo';
import ProductReviews from '@/app/ui/productDetail/ProductReviews';
import DetaiPageSkeleton from '@/app/ui/skeletons/detailPageSkeletons';
import { Suspense } from 'react';

export default async function Page({
  searchParams: searchParamsPromise, // Treat searchParams as a Promise
}: {
  searchParams?: Promise<{ id?: number }>; // Ensure searchParams is a Promise
}) {
  // Await the search parameters since they are treated as a Promise
  const searchParams = await searchParamsPromise;
  
  const id = searchParams?.id || -1;

  console.log(`Fetching product details for ID: ${id}`);

  // Fetch product data
  const product = await getSingleProduct(id);

  if (!product) {
    console.warn(`Product with ID ${id} not found.`);
    return <div>Product not found</div>;
  }

  return (
    <Suspense fallback={<DetaiPageSkeleton />}>
      <div className="min-w-[600px] p-2">  
        <div className="flex flex-row justify-between gap-16 max-dp:flex-wrap max-dp:justify-center max-dp:gap-16">
          {/* Left Section: Product Image Gallery */}
          <div className="order-1 max-dp:order-2 shrink-0 flex-grow min-w-[500px] flex flex-col items-center">
            <ProductGallery images={product.images} productName={product.title}/>
          </div> 

          {/* Right Section: Product Details */}
          <div className="order-2 max-dp:order-1 shrink-0">
            <ProductInfo product={product} />
          </div>   
        </div>

        {/* Reviews Section */}
        <div className="mt-14">
          <ProductReviews reviews={product.reviews} />
        </div>
      </div>
    </Suspense>
  );
}
