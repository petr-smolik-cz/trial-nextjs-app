import styles from './StarRating.module.css';

export default function StarRating({ 
    rating, 
    customStyle 
}: { 
    rating: number; 
    customStyle?: React.CSSProperties; // Optional inline style prop
}) {
    let percentageRating: number = (rating / 5) * 100;

    return (
        <div 
            className={styles.ratingContainer} 
            style={customStyle} // Apply the passed inline style here
        >
            <div>
                <span className={styles.starRating}>
                    <span style={{ width: percentageRating + '%' }}></span>
                </span>
            </div>
            <span className={styles.productRating}>{rating}</span>
        </div>
    );
}
