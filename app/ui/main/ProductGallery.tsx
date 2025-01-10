"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import { MainImageSkeleton } from '@/app/ui/skeletons';

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image
  const [showSkeleton, setShowSkeleton] = useState(false); // Controls skeleton visibility
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to track skeleton timeout

  const handleMainImageChange = (newImage: string) => {
    if (newImage !== mainImage) {
      setMainImage(newImage);
      setShowSkeleton(false); // Reset skeleton visibility

      // Clear any existing timeout before setting a new one
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current);
      }

      // Introduce a delay before showing the skeleton
      skeletonTimeoutRef.current = setTimeout(() => {
        setShowSkeleton(true); // Show skeleton only after delay
      }, 200); // Delay duration (200ms)
    }
  };

  const handleImageLoadComplete = () => {
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current); // Clear timeout if image loads quickly
    }
    setShowSkeleton(false); // Hide skeleton immediately when image loads
  };

  return (
    <>
      {/* Big image section */}
      <MainProductImage
        mainImage={mainImage}
        productName={productName}
        showSkeleton={showSkeleton}
        onLoadComplete={handleImageLoadComplete}
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

function MainProductImage({ mainImage, productName, showSkeleton, onLoadComplete }: 
  { mainImage: string, productName: string, showSkeleton: boolean, onLoadComplete: () => void }) {
  return (
    <div className="relative w-[460px] h-[460px]">
      {/* Loading skeleton */}
      {showSkeleton && (
        <MainImageSkeleton />
      )}

      {/* Main image */}
      <Image
        src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${460}`}
        alt={`Image of ${productName}`}
        className={`rounded-lg object-contain w-full h-full ${showSkeleton ? 'hidden' : 'block'}`}
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
            ${mainImage === image ? 'ring-2 ring-primary' : ''}`}
          width={90}
          height={65}
          onClick={() => onMainImageChange(image)} // Update selected image on click
        />
      ))}
    </div>
  );
}
