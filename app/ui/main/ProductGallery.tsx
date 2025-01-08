"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image
  const [isMainImageLoading, setIsMainImageLoading] = useState(false);

  const handleMainImageChange = (newImage: string) => {
    if (newImage !== mainImage) {
      setMainImage(newImage);
      setIsMainImageLoading(true); // Trigger loading state when a new image is selected
    }
  };

  return (
    <>
      {/* Big image section */}
      <MainProductImage
        mainImage={mainImage}
        productName={productName}
        isMainImageLoading={isMainImageLoading}
        onLoadComplete={() => setIsMainImageLoading(false)}
      />

      {/* Mini gallery for selecting images */}
      <MiniProductGallery
        images={images}
        productName={productName}
        mainImage={mainImage}
        onMainImageChange={handleMainImageChange}
      />
    </>
  );
}

function MainProductImage({ mainImage, productName, isMainImageLoading, onLoadComplete }: 
  { mainImage: string, productName: string, isMainImageLoading: boolean, onLoadComplete: () => void }) {
  return (
    <div className="relative w-[460px] h-[460px]">
      {/* Loading skeleton */}
      {isMainImageLoading ? (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      ) : null}

      {/* Main image */}
      <Image
        src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${460}`}
        alt={`Image of ${productName}`}
        className={`rounded-lg object-contain w-[460px] h-[460px] bg-[#fbfbfb] ${isMainImageLoading ? 'hidden' : 'block'}`}
        width={460}
        height={460}
        onLoadingComplete={onLoadComplete} // Stop loading when image is ready
      />
    </div>
  );
}

function MiniProductGallery({ images, productName, mainImage, onMainImageChange }: 
  { images: string[], productName: string, mainImage: string, onMainImageChange: (image: string) => void }) {
  return (
    <div className="flex mt-3 space-x-2">
      {images.map((image, index) => (
        <Image
          key={index}
          src={`/api/image?src=${encodeURIComponent(image)}&height=${90}`}
          alt={`Image of ${productName} ${index + 1}`}
          className={`w-[90px] h-[90px] rounded-lg object-contain cursor-pointer 
            ${mainImage === image ? 'ring-2 ring-primary' : ''} bg-white`}
          width={90}
          height={65}
          onClick={() => onMainImageChange(image)} // Update selected image on click
        />
      ))}
    </div>
  );
}
