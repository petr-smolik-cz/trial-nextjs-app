"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image
  return (
      <>
        {/* Big image that updates when a smaller image is clicked */}      
        <MainProductImage mainImage={mainImage}  productName={productName}/>
        <MiniProductGallery 
          images={images} productName={productName}
          mainImage={mainImage} onMainImageChange={setMainImage}
         />
      </>
  );
}

function MainProductImage({ mainImage, productName }: { mainImage: string, productName: string }) {
  return (
    <Image 
      src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${400}`}
      alt={`Image of ${productName}`}
      className="rounded-lg object-contain w-auto h-[400px] bg-white"
      width={400} 
      height={400} 
    />
  );
}

function MiniProductGallery({ images, productName, mainImage, onMainImageChange }
  : { images: string[], productName: string, mainImage: string, onMainImageChange: (image: string) => void }) {
    return (
      <div className="flex mt-3 space-x-2">
        {images.map((image, index) => (
          <Image 
            key={index} 
            src={`/api/image?src=${encodeURIComponent(image)}&height=${90}`}
            alt={`Image of ${productName} ${index + 1}`} 
            className={`w-[90px] h-[90px] rounded-lg object-contain cursor-pointer ${mainImage === image ? 'ring-2 ring-blue-500' : ''} bg-white`} 
            width={90} 
            height={65} 
            onClick={() => onMainImageChange(image)} // Update selected image on click
          />
        ))}
      </div>
    );
}
