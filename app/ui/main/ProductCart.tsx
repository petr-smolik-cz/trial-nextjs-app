import Image from 'next/image';
import styles from './ProductCart.module.css';
import { Product } from '@/app/lib/definitions';
import StarRating from '@/app/ui/main/StarRating';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';


export default function ProductCart({ product }: { product: Product }) {
    return (
      <div className={styles.product}>
        <div className={styles.productImgContainer}>
          <Image className={styles.productImg} src={product.images[0]} alt="Product Image" width={250} height={250} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.ratingContainer}>
            <StarRating rating={product.rating}/>
            <span className={styles.productRating}>{product.rating}</span>
          </div>
          <h2 className={styles.productName}>{product.title.replace(/-/g, '‑')}</h2>                   
          <p className={styles.productStock}>Stock: {product.stock}</p>
          <div className={styles.priceContainer}>
            <p className={styles.productPrice}>{ formatNumber(product.price) }$</p>
            <button className={styles.toShoppingCartButton}>
              <ShoppingCartIcon className={styles.icon} /> 
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
  );
}

function formatNumber(num: number): string {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}
