"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const borderBetweenStyle: React.CSSProperties = {
  width: '400px',
  margin: '15px auto',
  borderImage: 'linear-gradient(to right, transparent 0%, var(--color-primary) 50%, transparent 100%) 1',
  borderWidth: 'thin',
  borderStyle: 'solid',
};

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [mainImage, setMainImage] = useState(images[0]); // Currently displayed main image
  const [showSkeleton, setShowSkeleton] = useState(false); // Controls skeleton visibility
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Tracks skeleton timeout
  const imageLoadedRef = useRef<boolean[]>(images.map(() => false)); // Tracks loaded images

  const handleMainImageChange = (newImage: string, index: number) => {
    if (newImage !== mainImage) {    
      if (!imageLoadedRef.current[index]) {
        if (!showSkeleton) {
          if (skeletonTimeoutRef.current) {
            clearTimeout(skeletonTimeoutRef.current);
          }
          skeletonTimeoutRef.current = setTimeout(() => setShowSkeleton(true), 200);
        }
      } else if (showSkeleton) {
        setShowSkeleton(false);
      }      
      setMainImage(newImage);
    }
  };

  const handleImageLoadComplete = (index: number) => {   
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current);
    }
    imageLoadedRef.current[index] = true; // Mark image as loaded
    setShowSkeleton(false);
  };

  useEffect(() => {
    if (imageLoadedRef.current[0]) return;
    skeletonTimeoutRef.current = setTimeout(() => setShowSkeleton(true), 200);

    return () => {
      if (skeletonTimeoutRef.current) clearTimeout(skeletonTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <MainProductImage
        mainImage={mainImage}
        productName={productName}
        showSkeleton={showSkeleton}
        onLoadComplete={() => handleImageLoadComplete(images.indexOf(mainImage))}
      />
      <hr style={borderBetweenStyle} />
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
    <div className="relative flex items-center justify-center w-[500px] h-[500px] rounded-xl backdrop-brightness-[0.98]">
      {showSkeleton && (
        <Image 
          src="/big-image-file.png" 
          alt={`Placeholder for ${productName}`} 
          width={300} 
          height={300} 
          className="absolute w-[300px] h-[300px]" 
        />
      )}
      <Image
        src={`/api/image?src=${encodeURIComponent(mainImage)}&height=500`}
        alt={`Image of ${productName}`}
        className={`rounded-lg object-contain w-full h-full 
          ${showSkeleton ? 'opacity-0' : 'opacity-100'}`}
        width={500}
        height={500}
        onLoad={onLoadComplete}
      />
    </div>
  );
}

export function MiniProductGallery({ images, productName, mainImage, onMainImageChange }: 
  { images: string[], productName: string, mainImage: string, onMainImageChange: (image: string, index: number) => void }) {
  
  const [showSkeletons, setShowSkeletons] = useState<boolean[]>(images.map(() => true));

  const handleImageLoadComplete = (index: number) => {
    setShowSkeletons((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div className="w-full max-w-[650px] flex space-x-2 flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="relative flex items-center justify-center w-[90px] h-[90px] rounded-xl backdrop-brightness-[0.98]">
          {showSkeletons[index] && (
            <Image 
              src="/small-image-file.png" 
              alt={`Placeholder for ${productName} ${index + 1}`} 
              width={75} 
              height={75} 
              className="absolute w-[75px] h-[75px]" 
            />
          )}
          <Image
            src={`/api/image?src=${encodeURIComponent(image)}&height=85`} 
            alt={`Image of ${productName} ${index + 1}`}
            className={`w-full h-full rounded-lg object-contain cursor-pointer 
              ${mainImage === image ? 'ring-2 ring-primary' : ''}
              ${showSkeletons[index] ? 'opacity-0' : 'opacity-100'}`}
            width={85}
            height={85}
            onLoad={() => handleImageLoadComplete(index)}
            onClick={() => onMainImageChange(image, index)}
          />
        </div>
      ))}
    </div>
  );
}
