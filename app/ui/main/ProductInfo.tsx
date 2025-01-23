import AddToCartButton from '@/app/ui/main/AddToCartButton';
import StarRating from '@/app/ui/main/StarRating';
import { DetailedProduct } from '@/app/lib/definitions';

export default function ProductInfo({ product }: { product: DetailedProduct }) {
    return (        
        <div className="px-7 pb-7 pt-2 w-[450px] h-auto border border-[var(--color-primary)] rounded-lg backdrop-brightness-[0.98]"
            style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}
        >
            <div className="flex flex-row justify-between items-center">
                <p className="italic text-sm">{product.brand}</p>
                <StarRating rating={product.rating} customStyle={{ margin: '0px 0px 5px' }} />
            </div>
            
            <h1 className="text-2xl font-bold">{product.title}</h1>
            
            <p className="mt-2">{product.description}</p>
            {/* Two Columns for Other Details */}

            <div className="flex flex-col gap-2 mt-2 justify-between"> 
                <p>Weight: {product.weight}g</p>
                <p>Dimensions: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
                <p>Warranty:{product.warrantyInformation}</p>
                <p>Shipping: {product.shippingInformation}</p>
                <p>Return Policy: {product.returnPolicy}</p>
            </div>
            <input
  type="number"
  id="amount"
  name="amount"
  min="1"
  max="100"
  step="1"
  defaultValue={10}
/>
            {/* AddToCartButton in bottom-right corner */}
            <div className="flex flex-row justify-between items-center">
                <p className="text-[32px] text-[var(--color-primary)] p-2 border-2 border-[var(--color-primary)] rounded-lg">${formatNumber(product.price)}</p>
                <p className="">
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                </p>
            </div>
            <AddToCartButton customStyle={{ width: '100%', marginTop: '32px' }} />
        </div> 
    );
}

function formatNumber(num: number): string {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }  
