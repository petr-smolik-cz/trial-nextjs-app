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
        <div className="px-7 pb-8 pt-2 w-[450px] h-auto border border-[var(--color-primary)] rounded-lg backdrop-brightness-[0.98]"
            style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }}
        >
            <div className="flex flex-row justify-between items-center">
                <p className="italic text-sm">{product.brand}</p>
                <StarRating rating={product.rating} customStyle={{ margin: '0px 0px 5px' }} />
            </div>
            
            <h1 className="text-[28px] font-bold text-[var(--color-primary)]">{product.title}</h1>
            
            <p className="mt-2">{product.description}</p>
            
            <ul className="list-disc flex flex-col gap-2.5 pl-10 mt-4"> 
                <li className="marker:text-[var(--color-primary)] marker:text-lg">Weight: {product.weight}g</li>
                <li className="marker:text-[var(--color-primary)] marker:text-lg">Dimensions: {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</li>
                <li className="marker:text-[var(--color-primary)] marker:text-lg">{product.warrantyInformation}</li>
                <li className="marker:text-[var(--color-primary)] marker:text-lg">{product.shippingInformation}</li>
                <li className="marker:text-[var(--color-primary)] marker:text-lg">{product.returnPolicy}</li>
            </ul>

            <div className="flex flex-row justify-between items-center mt-7">
                <p className="text-[32px] text-[var(--color-primary)] p-2 border-2 border-[var(--color-primary)] rounded-lg">${formatNumber(product.price)}</p>
                <p className="flex-1 text-center text-[18px]">               
                    <span className={`font-bold ${product.stock > 0 ? 'text-[var(--color-primary)]' : 'text-[#db3251]'} ml-1`}>{product.stock}</span>
                    {' '}in stock
                </p>
            </div>

            <div className="flex items-center justify-between mt-6">
                {/* Pass quantity and handler to QuantitySelector */}
                <QuantitySelector 
                    quantity={quantity} 
                    onQuantityChange={handleQuantityChange} 
                    classname="ml-1" 
                />
                <AddToCartButton customStyle={{ width: '230px', marginTop: '17px' }} />
            </div>
        </div> 
    );
}

function formatNumber(num: number): string {
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
