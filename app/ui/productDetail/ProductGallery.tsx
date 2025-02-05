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
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image
  const [showSkeleton, setShowSkeleton] = useState(false); // Controls skeleton visibility
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to track skeleton timeout
  const imageLoadedRef = useRef<boolean>(false); // Ref to track image loading state after page reloaded


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
      console.log("Loading skeleton timeout cleared");
    }
    imageLoadedRef.current = true;
    setShowSkeleton(false); // Hide skeleton immediately when image loads
    console.log("Image loaded successfully");
  };

  useEffect(() => {
    if(imageLoadedRef.current) return; // if image is already loaded, don't show loading skeleton (happens on page reload)
    
    console.log("Going to show loading skeleton");
    // Show skeleton with delay on initial load
    skeletonTimeoutRef.current = setTimeout(() => {
      setShowSkeleton(true);
    }, 200); // Delay duration (200ms)

    return () => {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current); // Clear timeout on unmount
        console.log("Loading skeleton timeout cleared");
      }
    };
  }, []);

  return (
    <>
      {/* Big image section */}
      <MainProductImage
        mainImage={mainImage}
        productName={productName}
        showSkeleton={showSkeleton}
        onLoadComplete={handleImageLoadComplete}
      />
      <hr style={borderBetweenStyle} />
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
    <div className="relative flex items-center justify-center w-[500px] h-[500px] rounded-xl backdrop-brightness-[0.98]">
      {/* Loading skeleton */}
      {showSkeleton && (
        <Image src="/big-image-file.png" alt={`Image of ${productName}`} width={300} height={300} className="absolute w-[300px] h-[300px]" />
      )}

      {/* Main image */}
      <Image
        src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${500}`}
        alt={`Image of ${productName}`}
        className={`rounded-lg object-contain w-full h-full 
          ${showSkeleton ? 'opacity-0' : 'opacity-100'}`}
        width={500}
        height={500}
        onLoad={onLoadComplete} // Stop loading when image is ready
      />
    </div>
  );
}

export function MiniProductGallery({ images, productName, mainImage, onMainImageChange }: 
  { images: string[], productName: string, mainImage: string, onMainImageChange: (image: string) => void }) {
  
  const [showSkeletons, setshowSkeletons] = useState<boolean[]>(images.map(() => true)); // Initial loading states

  const handleImageLoadComplete = (index: number) => {
    setshowSkeletons((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false; // Mark image as loaded
      return newStates;
    });
  };

  return (
    <div className="w-full max-w-[650px] flex space-x-2 flex-wrap">
      {images.map((image, index) => (
        <div key={index} className="relative flex items-center justify-center w-[90px] h-[90px] rounded-xl backdrop-brightness-[0.98]">
          {/* Skeleton for small image */}
          {showSkeletons[index] && (
            <Image src="/small-image-file.png" alt={`Image of ${productName} ${index + 1}`} width={75} height={75} className="absolute w-[75px] h-[75px]" />
          )}

          <Image
            src={`/api/image?src=${encodeURIComponent(image)}&height=${85}`} 
            alt={`Image of ${productName} ${index + 1}`}
            className={`w-full h-full rounded-lg object-contain cursor-pointer 
              ${mainImage === image ? 'ring-2 ring-primary' : ''}
              ${showSkeletons[index] ? 'opacity-0' : 'opacity-100'}`}
            width={85}
            height={85}
            onLoad={() => handleImageLoadComplete(index)} // Trigger on load completion
            onClick={() => onMainImageChange(image)}
          />
        </div>
      ))}
    </div>
  );
}
