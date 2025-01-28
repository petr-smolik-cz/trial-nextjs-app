import { Review } from '@/app/lib/definitions';
import StarRating from '@/app/ui/StarRating';

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
    return (
        <>
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mt-8 mb-5">Reviews</h2>
            {reviews.map((review, index) => (
                <div key={index} className="p-4 border border-[var(--color-primary)] rounded-3xl backdrop-brightness-[0.96] mb-4">
                    <StarRating rating={review.rating} />
                    <p className="font-semibold">{review.reviewerName}</p> {/* Added reviewer name */}
                    <p>{review.comment}</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>       
            ))}
        </>
    );
}
