import styles from "./CardWrapper.module.css";
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';
import { getAllProducts, getCategoryProducts, getQueryProducts } from '@/app/lib/data';

/**
 * Fetches all products and renders them using the CardWrapper component.
 * 
 * @returns JSX.Element containing a list of all products.
 */
export async function AllCardWrapper() {
    console.log("Fetching all products...");
    let products = await getAllProducts();
    console.log(`Fetched ${products.length} products.`);
    return CardWrapper(products);
}

/**
 * Fetches products belonging to a specific category and renders them using the CardWrapper component.
 * 
 * @param {string} category - The category name for filtering products.
 * @returns JSX.Element containing a list of category-specific products.
 */
export async function CategoryCardWrapper({ category }: { category: string }) {
    console.log(`Fetching products for category: ${category}`);
    let products = await getCategoryProducts(category);
    console.log(`Fetched ${products.length} products for category: ${category}`);
    return CardWrapper(products);
}

/**
 * Fetches products based on a search query and renders them using the CardWrapper component.
 * 
 * @param {string} query - The search query to filter products.
 * @returns JSX.Element containing a list of queried products.
 */
export async function QueryCardWrapper({ query }: { query: string }) {
    console.log(`Fetching products for search query: "${query}"`);
    let products = await getQueryProducts(query);
    console.log(`Fetched ${products.length} products for query: "${query}"`);
    return CardWrapper(products);
}

/**
 * Renders a list of products as individual ProductCart components inside a container.
 * 
 * @param {Product[]} products - Array of products to be displayed.
 * @returns JSX.Element containing a grid of product cards.
 */
function CardWrapper(products: Product[]) {     
    return (      
        <div className={styles.cartContainer}>
            {products.map((product: Product) => (
                <ProductCart key={product.id} product={product} />
            ))}
        </div>
    );
}
