import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';

/**
 * QuantitySelector Component
 * --------------------------
 * Allows users to increase, decrease, or manually input a quantity value.
 * - Ensures the quantity remains between 0 and 999.
 * - Logs changes for debugging purposes.
 * 
 * @param {number} quantity - Current quantity value.
 * @param {(newQuantity: number) => void} onQuantityChange - Function to update the quantity.
 * @param {string} [classname] - Optional additional class names for styling.
 */
export default function QuantitySelector({
  quantity,
  onQuantityChange,
  classname,
}: {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  classname?: string;
}) {
  /**
   * Decrease the quantity by 1, ensuring it does not go below 0.
   */
  const handleDecrease = () => {
    if (quantity > 0) {
      console.log(`Decreasing quantity from ${quantity} to ${quantity - 1}`);
      onQuantityChange(quantity - 1);
    }
  };

  /**
   * Increase the quantity by 1, ensuring it does not exceed 999.
   */
  const handleIncrease = () => {
    if (quantity < 999) {
      console.log(`Increasing quantity from ${quantity} to ${quantity + 1}`);
      onQuantityChange(quantity + 1);
    }
  };

  /**
   * Handles manual input changes.
   * - Prevents non-numeric values.
   * - Ensures value stays within the range of 0-999.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Convert the input to a valid number and ensure it stays between 0 and 999
    const newValue = rawValue === "" ? 0 : Math.max(0, Math.min(999, Number(rawValue.replace(/^0+/, ""))));

    console.log(`Quantity input changed: ${rawValue} -> ${newValue}`);
    onQuantityChange(newValue);
  };

  return (   
    <div className={`flex flex-col ${classname || ""}`}>
      {/* Label for accessibility */}
      <label htmlFor="quantity" className="text-[var(--color-primary)] text-[12px] mb-[1px] font-bold">
        Quantity
      </label>

      <div className="flex items-center">
        {/* Decrease Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-l-md bg-[#44246e] text-white cursor-pointer hover:bg-[#694991]"
          onClick={handleDecrease}
        >
          <MinusIcon className="w-5 h-5" />
        </button>

        {/* Input Field for Manual Quantity Entry */}
        <input
          type="number"
          id="quantity"
          className="w-[46px] h-9 text-center text-lg border-t border-b border-[var(--color-primary)] appearance-none focus:outline-none"
          value={quantity.toString()}  // Convert number to string for controlled input
          onChange={handleInputChange}
          min="0"
          max="999"
        />

        {/* Increase Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-r-md bg-[#44246e] text-white cursor-pointer text-[26px] hover:bg-[#694991]"
          onClick={handleIncrease}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
