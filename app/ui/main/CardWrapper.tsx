import styles from "./CardWrapper.module.css";
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import { ProductSkeleton } from '@/app/ui/skeletons';
import { getAllProducts, getFiltredProducts } from '@/app/lib/data';

export default async function CardWrapper({
    category,
    query,
}: { 
    category?: string;
    query?: string;
}) { 
    let products: Product[] = [];
    if (category || query) {
        products = await getFiltredProducts(category, query);
    } else {
        products = await getAllProducts();
    }
    
    return (      
        <div className={styles.cartContainer}>
            {products.map((product: Product) => (
                <ProductCart key={product.id} product={product} />
            ))}
        </div>
    );
}

export function CardWrapperSkeleton() {
    return (     
        <div className={styles.cartContainer}>
            {[...Array(12)].map((x, i) =>
                <ProductSkeleton key={i + 1}/>
            )}      
        </div>
    );
}
