"use client";
import AddToCartButton from '@/app/ui/AddToCartButton';
import StarRating from '@/app/ui/StarRating';
import { DetailedProduct } from '@/app/lib/definitions';
import QuantitySelector from '@/app/ui/productDetail/QuantitySelector';
import { useState } from 'react';

export default function ProductInfo({ product }: { product: DetailedProduct }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity: number) => {
        setQuantity(newQuantity);
    };

    return (        
        <div className="px-7 pb-7 pt-2 w-[450px] h-auto border border-[var(--color-primary)] rounded-lg backdrop-brightness-[0.98]"
            style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}
        >
            <div className="flex flex-row justify-between items-center">
                <p className="italic text-sm">{product.brand}</p>
                <StarRating rating={product.rating} customStyle={{ margin: '0px 0px 5px' }} />
            </div>
            
            <h1 className="text-[28px] font-bold text-[var(--color-primary)]">{product.title}</h1>
            
            <p className="mt-2">{product.description}</p>
            
            <div className="flex flex-col gap-2 mt-2 justify-between"> 
                <p>Weight: {product.weight}g</p>
                <p>Dimensions: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
                <p>Warranty: {product.warrantyInformation}</p>
                <p>Shipping: {product.shippingInformation}</p>
                <p>Return Policy: {product.returnPolicy}</p>
            </div>

            {/* Pass quantity and handler to QuantitySelector */}
            <QuantitySelector 
                quantity={quantity} 
                onQuantityChange={handleQuantityChange} 
                classname="mt-4" 
            />

            <div className="flex flex-row justify-between items-center">
                <p className="text-[32px] text-[var(--color-primary)] p-2 border-2 border-[var(--color-primary)] rounded-lg">${formatNumber(product.price)}</p>
                <p className="mr-10">
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                </p>
            </div>
            <AddToCartButton customStyle={{ width: '100%', marginTop: '32px' }} />
        </div> 
    );
}

function formatNumber(num: number): string {
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
