
/*import styles from "./page.module.css";*/
import { getSingleProduct } from '@/app/lib/data';
import ProductGallery from '@/app/ui/main/ProductGallery';
import ProductInfo from '@/app/ui/main/ProductInfo';
import ProductReviews from '@/app/ui/main/ProductReviews';

export default async function Page({
  searchParams,
}: {
  searchParams?: { id?: number };
}) {
  const id = searchParams?.id || -1;
  console.log("Starting fetching process for product: " + id);
  const product = await getSingleProduct(id);
  /*if (isError) return <div>failed to load</div>
  if (isLoading) return (
    <div>Loading...</div>
  )*/
  if (!product) return <div>product not found</div>

  return (
    <div className="min-w-[950px] p-2">  
      <div className="flex flex-row">
        <div className="basis-7/12 shrink-0 min-w-[500px] flex flex-col items-center">
          <ProductGallery images={product.images} productName={product.title}/>
        </div> 
        {/* Right Section: Product Details */}
        <div className="basis-5/12 min-w-[490px] pl-2 shrink-0">
          <ProductInfo product={product} />
        </div>   
      </div>
      <div className="mt-10">
        <ProductReviews reviews={product.reviews} />
      </div>
    </div>
  );
}
