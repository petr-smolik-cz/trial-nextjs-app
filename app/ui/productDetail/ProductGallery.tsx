"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

/**
 * Styling for the separator line between the main image and the mini gallery.
 */
const borderBetweenStyle: React.CSSProperties = {
  width: '400px',
  margin: '15px auto',
  borderImage: 'linear-gradient(to right, transparent 0%, var(--color-primary) 50%, transparent 100%) 1',
  borderWidth: 'thin',
  borderStyle: 'solid',
};

/**
 * ProductGallery Component
 * ------------------------
 * Displays a product's image gallery, including a main large image and a set of smaller thumbnail images
 * for selection. Handles image loading states and skeleton placeholders.
 *
 * @param {string[]} images - Array of image URLs for the product.
 * @param {string} productName - Name of the product (used for alt attributes).
 */
export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image
  const [showSkeleton, setShowSkeleton] = useState(false); // Controls skeleton visibility
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref to track skeleton timeout
  const imageLoadedRef = useRef<boolean>(false); // Ref to track image loading state after page reload

  /**
   * Handles the change of the main image when a thumbnail is clicked.
   * Introduces a delay before showing the loading skeleton.
   * 
   * @param {string} newImage - The new image URL to display as the main image.
   */
  const handleMainImageChange = (newImage: string) => {
    if (newImage !== mainImage) {
      console.log(`Changing main image to: ${newImage}`);
      setMainImage(newImage);

      if (!showSkeleton) {
        // Clear any existing timeout before setting a new one
        if (skeletonTimeoutRef.current) {
          clearTimeout(skeletonTimeoutRef.current);
        }

        // Introduce a delay before showing the skeleton
        skeletonTimeoutRef.current = setTimeout(() => {
          setShowSkeleton(true); // Show skeleton only after delay
          console.log("Skeleton displayed for image loading");
        }, 200); // Delay duration (200ms)
      }
    }
  };

  /**
   * Handles the completion of the image load.
   * Ensures the skeleton is hidden once the image is fully loaded.
   */
  const handleImageLoadComplete = () => {   
    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current); // Clear timeout if image loads quickly
      console.log("Loading skeleton timeout cleared");
    }
    imageLoadedRef.current = true;
    setShowSkeleton(false); // Hide skeleton immediately when image loads
    console.log("Image loaded successfully");
  };

  /**
   * Runs on initial mount to determine if the skeleton should be shown.
   * If the image is already loaded (e.g., after a page reload), it prevents the skeleton from appearing.
   */
  useEffect(() => {
    if (imageLoadedRef.current) return; // If image is already loaded, don't show skeleton

    console.log("Going to show loading skeleton on initial mount");
    skeletonTimeoutRef.current = setTimeout(() => {
      setShowSkeleton(true);
    }, 200); // Delay duration (200ms)

    return () => {
      if (skeletonTimeoutRef.current) {
        clearTimeout(skeletonTimeoutRef.current); // Clear timeout on unmount
        console.log("Loading skeleton timeout cleared on unmount");
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

/**
 * MainProductImage Component
 * --------------------------
 * Displays the large product image along with a skeleton placeholder during loading.
 * 
 * @param {string} mainImage - The currently selected main image.
 * @param {string} productName - The name of the product for accessibility.
 * @param {boolean} showSkeleton - Whether the loading skeleton should be displayed.
 * @param {() => void} onLoadComplete - Callback function when the image has finished loading.
 */
function MainProductImage({ mainImage, productName, showSkeleton, onLoadComplete }: 
  { mainImage: string, productName: string, showSkeleton: boolean, onLoadComplete: () => void }) {
  return (
    <div className="relative flex items-center justify-center w-[500px] h-[500px] rounded-xl backdrop-brightness-[0.98]">
      {/* Loading skeleton */}
      {showSkeleton && (
        <Image 
          src="/big-image-file.png" 
          alt={`Placeholder for ${productName}`} 
          width={300} 
          height={300} 
          className="absolute w-[300px] h-[300px]" 
        />
      )}

      {/* Main image */}
      <Image
        src={`/api/image?src=${encodeURIComponent(mainImage)}&height=500`}
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

/**
 * MiniProductGallery Component
 * ----------------------------
 * Displays a set of thumbnail images for selecting the main image.
 * Includes loading skeletons for images until they are fully loaded.
 *
 * @param {string[]} images - Array of image URLs for thumbnails.
 * @param {string} productName - Name of the product (used for accessibility).
 * @param {string} mainImage - The currently selected main image.
 * @param {(image: string) => void} onMainImageChange - Callback function to update the main image.
 */
export function MiniProductGallery({ images, productName, mainImage, onMainImageChange }: 
  { images: string[], productName: string, mainImage: string, onMainImageChange: (image: string) => void }) {
  
  const [showSkeletons, setShowSkeletons] = useState<boolean[]>(images.map(() => true)); // Initial loading states

  /**
   * Handles the image load completion for each thumbnail.
   * 
   * @param {number} index - The index of the loaded image.
   */
  const handleImageLoadComplete = (index: number) => {
    console.log(`Thumbnail image ${index + 1} loaded`);
    setShowSkeletons((prevStates) => {
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
            onLoad={() => handleImageLoadComplete(index)} // Trigger on load completion
            onClick={() => onMainImageChange(image)}
          />
        </div>
      ))}
    </div>
  );
}
