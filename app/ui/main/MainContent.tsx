import styles from "./mainContent.module.css";
import { Product } from '@/app/lib/definitions';
import ProductCart from '@/app/ui/main/ProductCart';

export default function MainContent({ products }: { products: Product[] }) {
    return (
      <main className={styles.mainContent}>
          <div className={styles.cartContainer}>
            {products.map((product: Product, index: number) => (
              <ProductCart key={index} product={product} />
            ))}
          </div>
      </main>
    );
  }