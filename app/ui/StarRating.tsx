import styles from './StarRating.module.css';

/**
 * StarRating Component
 * --------------------
 * Displays a star rating based on a given rating value.
 * 
 * @param {number} rating - The rating value (out of 5).
 * @param {React.CSSProperties} customStyle - Optional inline styles.
 * @returns JSX.Element - A star rating visualization.
 */
export default function StarRating({ 
    rating, 
    customStyle 
}: { 
    rating: number; 
    customStyle?: React.CSSProperties;
}) {
    let percentageRating: number = (rating / 5) * 100; // Convert rating to percentage

    console.log(`Rendering StarRating: ${rating}/5 (${percentageRating}%)`);

    return (
        <div className={styles.ratingContainer} style={customStyle}>
            <div>
                {/* Star rating visualization */}
                <span className={styles.starRating}>
                    <span style={{ width: `${percentageRating}%` }}></span>
                </span>
            </div>
            {/* Display numeric rating */}
            <span className={styles.productRating}>{rating}</span>
        </div>
    );
}