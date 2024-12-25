import Image from 'next/image';
import styles from './ProductCart.module.css';
import { Product } from '@/app/lib/definitions';
import StarRating from '@/app/ui/main/StarRating';
import AddToCartButton from '@/app/ui/main/AddToCartButton';
import Link from 'next/link';

export default function ProductCart({ product }: { product: Product }) {
  const productName = product.title.replace(/-/g, '‑');
  return (
    <Link href={`/product/${formatLink(product.title)}?id=${product.id}`}> 
      <div className={styles.product}>
        <div className={styles.productImgContainer}>
          <Image className={styles.productImg} src={`/api/image?src=${encodeURIComponent(product.image)}&width=${330}`}
            alt={productName} width={220} height={220} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.ratingContainer}>
            <StarRating rating={product.rating}/>
            <span className={styles.productRating}>{product.rating}</span>
          </div>
          <h2 className={styles.productName}>{productName}</h2>                   
          <p className={styles.productStock}>Stock: {product.stock}</p>
          <div className={styles.priceContainer}>
            <p className={styles.productPrice}>${ formatNumber(product.price) }</p>
            <AddToCartButton />
          </div>
        </div>
      </div>
    </Link>
  );
}

function formatNumber(num: number): string {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function formatLink(link: string): string {
  return link
      .toLowerCase()               // Convert to lowercase
      .replace(/&/g, 'and')        // Replace '&' with 'and'
      .replace(/\s+/g, '-')        // Replace spaces with hyphens
      .replace(/[^a-z0-9\-]/g, ''); // Remove non-alphanumeric characters except hyphens
}
