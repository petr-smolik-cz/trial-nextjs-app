"use client";
import { useState } from 'react';
import styles from './AddToCartButton.module.css';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';

/**
 * AddToCartButton Component
 * -------------------------
 * Button that adds a product to the cart. Displays temporary feedback when clicked.
 * 
 * @param {React.CSSProperties} customStyle - Optional inline styles.
 * @returns JSX.Element - A button with an interactive "Add to Cart" feature.
 */
export default function AddToCartButton({
  customStyle,
}: {
  customStyle?: React.CSSProperties;
}) {
  const [buttonText, setButtonText] = useState("Add to cart"); // Button text state

  /**
   * Handles button click event.
   * - Prevents event from bubbling
   * - Temporarily changes button text
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} e - The click event.
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event from bubbling to parent
    e.preventDefault();  // Prevent Link's default navigation

    console.log("Item added to cart");

    // Change text to "Item added!"
    setButtonText("In the cart!");

    // Revert back to default text after 2 seconds
    setTimeout(() => {
      setButtonText("Add to cart");
      console.log("Button text reverted");
    }, 2000);
  };

  return (
    <button
      style={customStyle}
      className={styles.addToCartButton}
      onClick={handleClick}
    >
      <ShoppingCartIcon className={styles.icon} />
      <span>{buttonText}</span>
    </button>
  );
}