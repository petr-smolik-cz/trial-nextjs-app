"use client";
import { useState } from 'react';
import styles from './AddToCartButton.module.css';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';

export default function AddToCartButton({
  customStyle,
}: {
  customStyle?: React.CSSProperties;
}) {
  // State to control the text in the button
  const [buttonText, setButtonText] = useState("Add to cart");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent event from bubbling to parent
    e.preventDefault();  // Prevent Link's default navigation

    // Change text to "Item added!"
    setButtonText("In the cart!");

    // Revert back after 2 seconds
    setTimeout(() => {
      setButtonText("Add to cart");
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
