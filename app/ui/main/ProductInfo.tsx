import AddToCartButton from '@/app/ui/main/AddToCartButton';
import StarRating from '@/app/ui/main/StarRating';
import { DetailedProduct } from '@/app/lib/definitions';

export default function ProductInfo({ product }: { product: DetailedProduct }) {
    return (        
        <div className="px-7 pb-7 pt-2 w-[450px] h-auto border border-[var(--color-primary)] rounded-lg backdrop-brightness-[0.98]"
            style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}
        >
            <div className="flex flex-row justify-between items-center">
                <p className="italic">{product.brand}</p>
                <StarRating rating={product.rating} />
            </div>
            
            <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
            
            <p className="mt-4 mb-6">{product.description}</p>
            {/* Two Columns for Other Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-lg p-5">        
            
            
            
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Weight:</strong> {product.weight}g</p>
            <p><strong>Dimensions:</strong> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
            </div>

            {/* AddToCartButton in bottom-right corner */}
            <div className="flex flex-row justify-between items-center">
                <p className="text-4xl text-[var(--color-primary)] p-2 border-2 border-[var(--color-primary)] rounded-lg">${formatNumber(product.price)}</p>
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
