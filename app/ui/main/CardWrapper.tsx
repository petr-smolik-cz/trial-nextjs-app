import styles from "./CardWrapper.module.css";
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import { getAllProducts, getCategoryProducts, getQueryProducts } from '@/app/lib/data';

export async function AllCardWrapper() {
    let products = await getAllProducts();
    return CardWrapper(products);
}

export async function CategoryCardWrapper({ category }: { category: string}) {
    let products = await getCategoryProducts(category);
    return CardWrapper(products);
}

export async function QueryCardWrapper({ query }: { query: string}) {
    let products = await getQueryProducts(query);
    return CardWrapper(products);
}

function CardWrapper(products: Product[]) {     
    return (      
        <div className={styles.cartContainer}>
            {products.map((product: Product) => (
                <ProductCart key={product.id} product={product} />
            ))}
        </div>
    );
}
