import styles from './StarRating.module.css';

export default function StarRating({ rating }: { rating: number }) {
    let percentageRating: number = (rating/5)*100;
    return (
        <div className={styles.ratingContainer}>
            <div>
                <span className={styles.starRating}><span style={{ width: percentageRating + '%' }}></span></span>
            </div>
            <span className={styles.productRating}>{rating}</span>
        </div> 
    );
}
