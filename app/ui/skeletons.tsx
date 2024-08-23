import styles from "./skeletons.module.css";

export function ProductSkeleton() {
  return (
    <div className={styles.product}>
      <div className={`${styles.skeleton} ${styles.productImgContainer}`}>
        <div className={`${styles.skeleton} ${styles.productImg}`}></div>
      </div>
      <div className={styles.productInfo}>
        <div className={styles.ratingContainer}>
          <div className={`${styles.skeleton} ${styles.starSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.starSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.starSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.starSkeleton}`}></div>
          <div className={`${styles.skeleton} ${styles.starSkeleton}`}></div>
        </div>
        <div className={`${styles.skeleton} ${styles.productName}`}></div>
        <div className={`${styles.skeleton} ${styles.productStock}`}></div>
        <div className={styles.priceContainer}>
          <div className={`${styles.skeleton} ${styles.productPrice}`}></div>
          <div className={`${styles.skeleton} ${styles.toShoppingCartButton}`}></div>
        </div>
      </div>
    </div>
  );
}