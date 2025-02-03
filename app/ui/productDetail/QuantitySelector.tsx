import React from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  classname,
}: {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  classname?: string;
}) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 999) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    // Ensure the value respects the min (1) and max (999), and remove leading zeros
    const newValue = rawValue === "" ? 1 : Math.max(1, Math.min(999, Number(rawValue.replace(/^0+/, ""))));

    // Update the parent state
    onQuantityChange(newValue);
  };

  return (   
    <div className={`flex flex-col ${classname || ""}`}>
      <label htmlFor="quantity" className="text-[var(--color-primary)] text-[12px] mb-[1px] font-bold">Quantity</label>
      <div className="flex items-center">
        {/* Decrease Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-l-md bg-[#44246e] text-white cursor-pointer hover:bg-[#694991]"
          onClick={handleDecrease}
        >
          <MinusIcon className="w-5 h-5" />
        </button>

        {/* Input Field */}
        <input
          type="number"
          id="quantity"
          className="w-[46px] h-9 text-center text-lg border-t border-b border-[var(--color-primary)] appearance-none focus:outline-none"
          value={quantity.toString()} // Always update to the latest number as a string
          onChange={handleInputChange}
          min="1" // Set minimum value to 1
          max="999" // Set maximum value to 999
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
