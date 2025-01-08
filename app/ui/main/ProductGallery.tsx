"use client";
import { useState } from 'react';
import Image from 'next/image';
import { MainImageSkeleton } from '@/app/ui/skeletons';

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [mainImageIndex, setMainImageIndex] = useState(0); // Initial big image index
  const [isMainImageLoading, setIsMainImageLoading] = useState(false);
  const [loadedImageIndexes, setLoadedImageIndexes] = useState<number[]>([0]); // Keep track of loaded image indexes

  const handleMainImageChange = (newIndex: number) => {
    if (newIndex !== mainImageIndex) {
      setMainImageIndex(newIndex);

      // Check if the image at the new index has already been loaded
      if (loadedImageIndexes.includes(newIndex)) {
        setIsMainImageLoading(false); // Skip skeleton if already loaded
      } else {
        setIsMainImageLoading(true); // Show skeleton for a new image
      }
    }
  };

  const handleImageLoadComplete = () => {
    setIsMainImageLoading(false);

    // Add the newly loaded image index to the list of loaded indexes
    setLoadedImageIndexes((prevIndexes) => [...prevIndexes, mainImageIndex]);
  };

  return (
    <>
      {/* Big image section */}
      <MainProductImage
        mainImage={images[mainImageIndex]}
        productName={productName}
        isMainImageLoading={isMainImageLoading}
        onLoadComplete={handleImageLoadComplete}
      />

      {/* Mini gallery for selecting images */}
      <MiniProductGallery
        images={images}
        productName={productName}
        mainImageIndex={mainImageIndex}
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
      {isMainImageLoading && (
        <MainImageSkeleton /> 
      )}

      {/* Main image */}
      <Image
        src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${460}`}
        alt={`Image of ${productName}`}
        className={`rounded-lg object-contain w-[460px] h-[460px] ${isMainImageLoading ? 'hidden' : 'block'}`}
        width={460}
        height={460}
        onLoadingComplete={onLoadComplete} // Stop loading when image is ready
      />
    </div>
  );
}

function MiniProductGallery({ images, productName, mainImageIndex, onMainImageChange }: 
  { images: string[], productName: string, mainImageIndex: number, onMainImageChange: (index: number) => void }) {
  return (
    <div className="flex mt-3 space-x-2">
      {images.map((image, index) => (
        <Image
          key={index}
          src={`/api/image?src=${encodeURIComponent(image)}&height=${90}`}
          alt={`Image of ${productName} ${index + 1}`}
          className={`w-[90px] h-[90px] rounded-lg object-contain cursor-pointer 
            ${mainImageIndex === index ? 'ring-2 ring-primary' : ''}`}
          width={90}
          height={65}
          onClick={() => onMainImageChange(index)} // Update selected image on click
        />
      ))}
    </div>
  );
}

