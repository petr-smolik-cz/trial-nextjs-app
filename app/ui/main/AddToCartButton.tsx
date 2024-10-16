import styles from './AddToCartButton.module.css';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';

export default function AddToCartButton() {
    return ( 
        <button className={styles.addToCartButton}>
            <ShoppingCartIcon className={styles.icon} />
            <span>Add to cart</span>
        </button>
    );
}
