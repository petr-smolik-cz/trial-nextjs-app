import styles from "./CardWrapper.module.css";
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import Link from 'next/link';
import { ProductSkeleton } from '@/app/ui/skeletons';

export default function CardWrapper({ products }: { products: Product[] }) { 
    return (      
        <div className={styles.cartContainer}>
            {products.map((product: Product, index: number) => (
                <Link key={product.id} href={`/product/${product.title}`}>
                    <ProductCart key={index} product={product} />
                </Link>
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
