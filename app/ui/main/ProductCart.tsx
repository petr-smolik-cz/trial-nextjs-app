import Image from 'next/image';
import styles from './ProductCart.module.css';
import { Product } from '@/app/lib/definitions';
import StarRating from '@/app/ui/main/StarRating';
import AddToCartButton from '@/app/ui/main/AddToCartButton';

export default function ProductCart({ product }: { product: Product }) {
    return (
      <div className={styles.product}>
        <div className={styles.productImgContainer}>
          <Image className={styles.productImg} src={product.images[0]} alt="Image of product" width={220} height={220} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.ratingContainer}>
            <StarRating rating={product.rating}/>
            <span className={styles.productRating}>{product.rating}</span>
          </div>
          <h2 className={styles.productName}>{product.title.replace(/-/g, '‑')}</h2>                   
          <p className={styles.productStock}>Stock: {product.stock}</p>
          <div className={styles.priceContainer}>
            <p className={styles.productPrice}>${ formatNumber(product.price) }</p>
            <AddToCartButton />
          </div>
        </div>
      </div>
  );
}

function formatNumber(num: number): string {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
