import Image from 'next/image';
import styles from './ProductCart.module.css';
import { Product } from '@/app/lib/definitions';
import StarRating from '@/app/ui/StarRating';
import AddToCartButton from '@/app/ui/AddToCartButton';
import Link from 'next/link';

/**
 * ProductCart Component
 * ---------------------
 * Renders a single product card with an image, rating, title, stock count, price, and an "Add to Cart" button.
 * Clicking the card navigates to the product details page.
 * 
 * @param {Product} product - The product data to display.
 * @returns JSX.Element - A product card component.
 */
export default function ProductCart({ product }: { product: Product }) {
  console.log(`Rendering ProductCart for: ${product.title}`);

  // Replace hyphens with non-breaking hyphens for better readability
  const productName = product.title.replace(/-/g, '‑');

  return (
    <Link href={`/product/${formatLink(product.title)}?id=${product.id}`}> 
      <div className={styles.product}>
        
        {/* Product Image */}
        <Image 
          className={styles.productImg} 
          src={`/api/image?src=${encodeURIComponent(product.image)}&height=${225}`}
          alt={productName} 
          width={225} 
          height={225}
        />

        {/* Product Info */}
        <div className={styles.productInfo}>
          <StarRating rating={product.rating} />

          {/* Product Name */}
          <h2 className={styles.productName}>{productName}</h2>                   

          {/* Stock Information */}
          <p className={styles.productStock}>Stock: {product.stock}</p>

          {/* Price & Add to Cart Button */}
          <div className={styles.priceContainer}>
            <p className={styles.productPrice}>${formatNumber(product.price)}</p>
            <AddToCartButton />
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Formats a number with thousands separators.
 * 
 * @param {number} num - The number to format.
 * @returns {string} - The formatted number as a string.
 */
function formatNumber(num: number): string {
  console.log(`Formatting number: ${num}`);
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands
  return parts.join(".");
}

/**
 * Formats a product title into a URL-friendly link.
 * 
 * - Converts to lowercase
 * - Replaces '&' with 'and'
 * - Replaces spaces with hyphens
 * - Removes non-alphanumeric characters except hyphens
 * 
 * @param {string} link - The original product title.
 * @returns {string} - A formatted URL-friendly string.
 */
function formatLink(link: string): string {
  console.log(`Formatting link: ${link}`);
  return link
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, ''); 
}
