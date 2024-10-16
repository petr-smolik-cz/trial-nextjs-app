"use client";
import styles from "./page.module.css";
import { useSingleProduct } from '@/app/lib/data';
import AddToCartButton from '@/app/ui/main/AddToCartButton';
import Image from 'next/image';
import { ProductSkeleton } from '@/app/ui/skeletons';

export default function Page({
  searchParams,
}: {
  searchParams?: { id?: number };
}) {
  const id = searchParams?.id || -1;
  console.log("Starting fetching process for product: " + id);
  const { product, isLoading, isError } = useSingleProduct(id);
  if (isError || !product) return <div>failed to load</div>
  if (isLoading) return (
    <h1>Loading...</h1>
  )

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <Image src={product.images[0]} alt="Image of product" className={styles.bigImage} width={512} height={512}/>
        <div className={styles.imageGallery}>
          {product.images.map((image, index) => (
            <Image key={index} src={image} alt={`Gallery image ${index + 1}`} width={250} height={250} />
          ))}
        </div>
      </div>
      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.stock}>
          {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
        </p>
        <p className={styles.description}>{product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Weight:</strong> {product.weight}g</p>
        <p><strong>Dimensions:</strong> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
        <p><strong>Shipping:</strong> {product.shippingInformation}</p>
        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
        <AddToCartButton />       
      </div>
      <div className={styles.reviews}>
        <h2>Customer Reviews</h2>
        {product.reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <h4>{review.reviewerName} <span className={styles.rating}>{'★'.repeat(review.rating)}</span></h4>
            <p>{review.comment}</p>
            <p><small>{new Date(review.date).toLocaleDateString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}