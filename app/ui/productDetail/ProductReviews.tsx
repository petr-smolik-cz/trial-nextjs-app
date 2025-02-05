import { Review } from '@/app/lib/definitions';
import StarRating from '@/app/ui/StarRating';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
    return (
        <>
            <div className="mt-8 mb-6 h-8 flex flex-row items-center gap-[9px]">
                <h2 className="text-[25px] font-bold text-[var(--color-primary)] ">Reviews</h2>
                <ChatBubbleLeftIcon className="w-[27px] h-[27px] mt-[1px] text-[var(--color-primary)]"/>
            </div>
            {reviews.map((review, index) => (
                <div
                    key={index}
                    className="flex flex-col px-4 py-1 min-h-[140px] border border-[var(--color-primary)] rounded-xl backdrop-brightness-[0.96] mb-4"
                > 
                    {/* Header */}
                    <div className="flex flex-row items-center gap-1.5 w-full">
                        <UserCircleIcon className="w-[25px] h-[25px] text-[var(--color-primary)]"/>
                        <p className="text-[16px] font-bold text-[var(--color-primary)]">{review.reviewerName}</p>
                        <StarRating rating={review.rating} customStyle={{ marginRight: '0px' }}/>
                    </div>
                
                    {/* Comment */}
                    <p className="mt-4 mx-9 mb-3 text-[15px]">{"\"" + review.comment + "\""}</p>
                
                    {/* Date aligned to bottom-right */}
                    <p className="text-[13px] ml-auto mt-auto mb-0.5 mr-1">{new Date(review.date).toLocaleDateString()}</p>
                </div>                
            ))}
        </>
    );
}
