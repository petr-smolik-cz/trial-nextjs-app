import styles from "./CardWrapper.module.css";
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import Link from 'next/link';
import { ProductSkeleton } from '@/app/ui/skeletons';

export default function CardWrapper({ products }: { products: Product[] }) { 
    return (      
        <div className={styles.cartContainer}>
            {products.map((product: Product) => (
                <Link key={product.id} href={`/product/${formatLink(product.title)}?id=${product.id}`}>
                    <ProductCart product={product} />
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

function formatLink(link: string): string {
    return link
        .toLowerCase()               // Convert to lowercase
        .replace(/&/g, 'and')        // Replace '&' with 'and'
        .replace(/\s+/g, '-')        // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, ''); // Remove non-alphanumeric characters except hyphens
}
