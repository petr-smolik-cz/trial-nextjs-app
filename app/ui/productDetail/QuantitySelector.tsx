import React from 'react';

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
    onQuantityChange(quantity + 1);
  };

  return (
    <div className={`flex items-center gap-2 ${classname || ""}`}>
      {/* Decrease Button */}
      <button
        className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded cursor-pointer text-lg hover:bg-[var(--color-secondary)]"
        onClick={handleDecrease}
      >
        -
      </button>

      {/* Input Field */}
      <input
        type="number"
        className="w-12 h-8 text-center text-lg border border-gray-300 rounded appearance-none"
        value={quantity}  
        onChange={(e) => onQuantityChange(Number(e.target.value))}     
      />

      {/* Increase Button */}
      <button
        className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary)] text-white rounded cursor-pointer text-lg hover:bg-[var(--color-secondary)]"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
}
