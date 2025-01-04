"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]); // Initial big image
  return (
      <>
        {/* Big image that updates when a smaller image is clicked */}      
        <MainProductImage mainImage={mainImage} />
        <MiniProductGallery images={images} mainImage={mainImage} onMainImageChange={setMainImage}/>
      </>
  );
}

function MainProductImage({ mainImage }: { mainImage: string }) {
  return (
    <Image 
      src={`/api/image?src=${encodeURIComponent(mainImage)}&height=${600}`}
      alt="Product image"
      className="rounded-lg object-cover w-auto h-[400px]"
      width={600} 
      height={600} 
    />
  );
}

function MiniProductGallery({ images, mainImage, onMainImageChange }
  : { images: string[], mainImage: string, onMainImageChange: (image: string) => void }) {
    return (
      <div className="flex mt-3 space-x-2">
        {images.map((image, index) => (
          <Image 
            key={index} 
            src={`/api/image?src=${encodeURIComponent(image)}&height=${90}`}
            alt={`Gallery image ${index + 1}`} 
            className={`w-[90px] h-[90px] rounded-lg object-cover cursor-pointer ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`} 
            width={90} 
            height={65} 
            onClick={() => onMainImageChange(image)} // Update selected image on click
          />
        ))}
      </div>
    );
}
