"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image

  return (
      <div className="col-span-1">
        {/* Big image that updates when a smaller image is clicked */}
        <Image 
          src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${512}`}
          alt="Product image"
          className="rounded-lg object-cover w-auto h-[512px]"
          width={512} 
          height={512} 
        />
        
        {/* Image gallery */}
        <div className="flex mt-3 space-x-2">
          {images.map((image, index) => (
            <Image 
              key={index} 
              src={`/api/image?src=${encodeURIComponent(image)}&height=${70}`}
              alt={`Gallery image ${index + 1}`} 
              className={`w-[95px] h-[70px] rounded-lg object-cover cursor-pointer ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`} 
              width={95} 
              height={70} 
              onClick={() => setMainImage(image)} // Update selected image on click
            />
          ))}
        </div>
      </div>
  );
}
