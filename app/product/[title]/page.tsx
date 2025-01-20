
/*import styles from "./page.module.css";*/
import { getSingleProduct } from '@/app/lib/data';
import AddToCartButton from '@/app/ui/main/AddToCartButton';
import StarRating from '@/app/ui/main/StarRating';
import ProductGallery from '@/app/ui/main/ProductGallery';

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
          <div className="p-7 w-[450px] h-auto border border-[var(--color-primary)] rounded-lg backdrop-brightness-[0.98]"
            style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}
          >
            <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
            <StarRating rating={product.rating} />
            <p className="mt-4 mb-6">{product.description}</p>
            {/* Two Columns for Other Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-lg p-5">        
              
              <p className={`mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
              </p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Weight:</strong> {product.weight}g</p>
              <p><strong>Dimensions:</strong> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
              <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
              <p><strong>Shipping:</strong> {product.shippingInformation}</p>
              <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
            </div>

            {/* AddToCartButton in bottom-right corner */}
            <div className="flex flex-row items-center gap-7">
              <p className="text-4xl text-[var(--color-primary)] p-2 border-2 border-[var(--color-primary)] rounded-lg">${formatNumber(product.price)}</p>
              <AddToCartButton width="100%"/>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-5">Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4">
          <StarRating rating={review.rating} />
          <p className="font-semibold">{review.reviewerName}</p> {/* Added reviewer name */}
          <p>{review.comment}</p>
          <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
        </div>       
        ))}
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
