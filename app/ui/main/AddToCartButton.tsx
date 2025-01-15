import styles from './AddToCartButton.module.css';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';

export default function AddToCartButton({ width }: { width?: string }) {
    return ( 
      <button 
        className={styles.addToCartButton} 
        style={width ? { width: width } : {}}
      >
        <ShoppingCartIcon className={styles.icon} />
        <span>Add to cart</span>
      </button>
    );
  }
