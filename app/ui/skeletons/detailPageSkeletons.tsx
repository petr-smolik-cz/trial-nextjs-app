import styles from "./detailPageSkeletons.module.css";

export default function DetaiPageSkeleton() {
  return (
    <div className={styles.container}>
      {/* Top Section: Gallery & Info */}
      <div className={styles.galleryInfoContainer}>
        {/* Image Skeleton */}
        <div className={`${styles.skeleton} ${styles.gallery}`} />

        {/* Product Info Skeleton */}
        <div className={styles.info}>
          <div className={`${styles.skeleton} ${styles.title}`} />
          <div className={`${styles.skeleton} ${styles.description}`} />
          <div className={`${styles.skeleton} ${styles.details}`} />
          <div className={`${styles.skeleton} ${styles.details}`} />
          <div className={`${styles.skeleton} ${styles.details}`} />
          <div className={`${styles.skeleton} ${styles.price}`} />
          <div className={`${styles.skeleton} ${styles.stock}`} />
          <div className={`${styles.skeleton} ${styles.addToCart}`} />
        </div>
      </div>

      {/* Reviews */}
      <div className={`${styles.skeleton} ${styles.reviews}`} />
      <div className={`${styles.skeleton} ${styles.reviews}`} />
      <div className={`${styles.skeleton} ${styles.reviews}`} />
    </div>
  );
}
