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

export function SideNavigSkeleton() {
  return (
    <nav className={styles.sideMenu}>
      <ul className={styles.menuList}>
        {/* Skeleton loading placeholders */}
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index}>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
            <hr className={`${styles.skeleton} ${styles.skeletonBorderBetween}`} />
          </li>
        ))}
      </ul>
    </nav>
  );
 }
