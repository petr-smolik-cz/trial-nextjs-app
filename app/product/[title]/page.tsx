
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
    <div className="grid grid-cols-1 md:grid-cols-9 p-5">  
      <div className="col-span-5 m-5 mr-10 flex flex-col justify-center">
        <ProductGallery images={product.images} productName={product.title}/>
      </div> 
      {/* Right Section: Product Details */}
      <div className="col-span-4 relative p-5 border rounded-lg">
        <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
        <p className="mt-4 mb-6">{product.description}</p>
        {/* Two Columns for Other Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 rounded-lg p-5">
          <p className="text-xl text-orange-500 mb-4">${product.price.toFixed(2)}</p>
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
        <div className="absolute bottom-5 right-5">
          <AddToCartButton />
        </div>
      </div>
    
      <div className="col-span-9 mt-10">
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
