"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Style configuration for the separator line between the main image and thumbnails.
const borderBetweenStyle: React.CSSProperties = {
  width: "400px",
  margin: "15px auto",
  borderImage:
    "linear-gradient(to right, transparent 0%, var(--color-primary) 50%, transparent 100%) 1",
  borderWidth: "thin",
  borderStyle: "solid",
};

/**
 * ProductGallery Component
 * 
 * This component renders a gallery containing:
 * - A main product image that updates when a thumbnail is clicked.
 * - A mini thumbnail gallery below to select images.
 * - A skeleton loader while images are loading.
 * 
 * @param {string[]} images - Array of product image URLs.
 * @param {string} productName - Name of the product (used for alt text).
 */
export default function ProductGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [mainImage, setMainImage] = useState(images[0]); // Currently displayed main image
  const [showSkeleton, setShowSkeleton] = useState(false); // Controls skeleton visibility
  const skeletonTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Tracks skeleton timeout
  const imageLoadedRef = useRef<boolean[]>(images.map(() => false)); // Tracks loaded images

  /**
   * Handles changing the main image when a thumbnail is clicked.
   * Shows skeleton loader if the new image is not yet loaded.
   *
   * @param {string} newImage - The new image URL to be displayed as the main image.
   * @param {number} index - The index of the selected image in the `images` array.
   */
  const handleMainImageChange = (newImage: string, index: number) => {
    console.log(`Changing main image to index ${index}: ${newImage}`);

    if (newImage !== mainImage) {
      // If the new image is not yet loaded, show the skeleton loader.
      if (!imageLoadedRef.current[index]) {
        console.log(`Image at index ${index} not loaded yet. Showing skeleton.`);

        if (!showSkeleton) {
          if (skeletonTimeoutRef.current) {
            clearTimeout(skeletonTimeoutRef.current);
          }
          skeletonTimeoutRef.current = setTimeout(() => setShowSkeleton(true), 200);
        }
      } else if (showSkeleton) {
        console.log("Image already loaded. Hiding skeleton.");
        setShowSkeleton(false);
      }

      setMainImage(newImage);
    }
  };

  /**
   * Marks an image as loaded and hides the skeleton loader.
   * 
   * @param {number} index - The index of the loaded image in the `images` array.
   */
  const handleImageLoadComplete = (index: number) => {
    console.log(`Image at index ${index} loaded successfully.`);

    if (skeletonTimeoutRef.current) {
      clearTimeout(skeletonTimeoutRef.current);
    }

    imageLoadedRef.current[index] = true; // Mark image as loaded
    setShowSkeleton(false);
  };

  /**
   * Effect hook: Initializes skeleton loader for the first image if it's not preloaded.
   * Ensures cleanup of skeleton timeout on unmount or update.
   */
  useEffect(() => {
    if (imageLoadedRef.current[0]) return;
    console.log("First image not preloaded. Displaying skeleton temporarily.");
    skeletonTimeoutRef.current = setTimeout(() => setShowSkeleton(true), 200);

    return () => {
      if (skeletonTimeoutRef.current) clearTimeout(skeletonTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Displays the main image with a skeleton loader if necessary */}
      <MainProductImage
        mainImage={mainImage}
        productName={productName}
        showSkeleton={showSkeleton}
        onLoadComplete={() => handleImageLoadComplete(images.indexOf(mainImage))}
      />
      <hr style={borderBetweenStyle} />
      {/* Thumbnail gallery to switch images */}
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
 * 
 * Displays the currently selected product image with a skeleton loader.
 * 
 * @param {string} mainImage - The URL of the main image to display.
 * @param {string} productName - Name of the product (used for alt text).
 * @param {boolean} showSkeleton - Whether to show a skeleton loader.
 * @param {Function} onLoadComplete - Callback function when the image has fully loaded.
 */
function MainProductImage({
  mainImage,
  productName,
  showSkeleton,
  onLoadComplete,
}: {
  mainImage: string;
  productName: string;
  showSkeleton: boolean;
  onLoadComplete: () => void;
}) {
  return (
    <div className="relative flex items-center justify-center w-[500px] h-[500px] rounded-xl backdrop-brightness-[0.98]">
      {/* Skeleton placeholder if image is still loading */}
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
          ${showSkeleton ? "opacity-0" : "opacity-100"}`}
        width={500}
        height={500}
        onLoad={onLoadComplete}
      />
    </div>
  );
}

/**
 * MiniProductGallery Component
 * 
 * Displays a gallery of small thumbnail images. Clicking a thumbnail updates the main image.
 * 
 * @param {string[]} images - Array of thumbnail image URLs.
 * @param {string} productName - Name of the product (used for alt text).
 * @param {string} mainImage - Currently displayed main image.
 * @param {Function} onMainImageChange - Callback function to update the main image.
 */
export function MiniProductGallery({
  images,
  productName,
  mainImage,
  onMainImageChange,
}: {
  images: string[];
  productName: string;
  mainImage: string;
  onMainImageChange: (image: string, index: number) => void;
}) {
  const [showSkeletons, setShowSkeletons] = useState<boolean[]>(images.map(() => true));

  /**
   * Marks an individual thumbnail image as loaded and hides its skeleton.
   * 
   * @param {number} index - The index of the loaded thumbnail.
   */
  const handleImageLoadComplete = (index: number) => {
    console.log(`Thumbnail at index ${index} loaded successfully.`);

    setShowSkeletons((prev) => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div className="w-full max-w-[650px] flex space-x-2 flex-wrap">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative flex items-center justify-center w-[90px] h-[90px] rounded-xl backdrop-brightness-[0.98]"
        >
          {/* Skeleton placeholder for thumbnail */}
          {showSkeletons[index] && (
            <Image
              src="/small-image-file.png"
              alt={`Placeholder for ${productName} ${index + 1}`}
              width={75}
              height={75}
              className="absolute w-[75px] h-[75px]"
            />
          )}
          {/* Thumbnail image */}
          <Image
            src={`/api/image?src=${encodeURIComponent(image)}&height=85`}
            alt={`Image of ${productName} ${index + 1}`}
            className={`w-full h-full rounded-lg object-contain cursor-pointer 
              ${mainImage === image ? "ring-2 ring-primary" : ""}
              ${showSkeletons[index] ? "opacity-0" : "opacity-100"}`}
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
