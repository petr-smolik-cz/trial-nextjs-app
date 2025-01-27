"use client";
import styles from './AddToCartButton.module.css';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';

export default function AddToCartButton({
  customStyle,
}: {
  customStyle?: React.CSSProperties;
}) {
  return (
    <button style={customStyle} className={styles.addToCartButton}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event from bubbling to parent
        e.preventDefault(); // Prevent Link's default navigation
    }}>
      <ShoppingCartIcon className={styles.icon} />
      <span>Add to cart</span>
    </button>
  );
}
