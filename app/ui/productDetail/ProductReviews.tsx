import { Review } from '@/app/lib/definitions';
import StarRating from '@/app/ui/StarRating';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

/**
 * ProductReviews Component
 * -------------------------
 * Displays a list of product reviews, including the reviewer's name, rating, comment, and date.
 *
 * @param {Review[]} reviews - An array of review objects containing reviewerName, rating, comment, and date.
 */
export default function ProductReviews({ reviews }: { reviews: Review[] }) {
    return (
        <>
            {/* Reviews Header with Title and Icon */}
            <div className="mt-8 mb-6 h-8 flex flex-row items-center gap-[9px]">
                <h2 className="text-[25px] font-bold text-[var(--color-primary)]">Reviews</h2>
                <ChatBubbleLeftIcon className="w-[27px] h-[27px] mt-[1px] text-[var(--color-primary)]" />
            </div>

            {/* Render each review in a styled card */}
            {reviews.map((review, index) => (
                <div
                    key={index} // Using index as key (ensure reviews array is stable)
                    className="flex flex-col px-4 py-1 min-h-[140px] border border-[var(--color-primary)] rounded-xl backdrop-brightness-[0.96] mb-4"
                >
                    {/* Review Header: Reviewer Name, Profile Icon, and Star Rating */}
                    <div className="flex flex-row items-center gap-1.5 w-full">
                        <UserCircleIcon className="w-[25px] h-[25px] text-[var(--color-primary)]" />
                        <p className="text-[16px] font-bold text-[var(--color-primary)]">{review.reviewerName}</p>
                        <StarRating rating={review.rating} customStyle={{ marginRight: '0px' }} />
                    </div>

                    {/* Review Comment */}
                    <p className="mt-4 mx-9 mb-3 text-[15px]">{"\"" + review.comment + "\""}</p>

                    {/* Review Date: Displayed in bottom-right corner */}
                    <p className="text-[13px] ml-auto mt-auto mb-0.5 mr-1">
                        {new Date(review.date).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </>
    );
}
