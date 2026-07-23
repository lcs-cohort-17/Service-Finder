import React from "react";
import ReviewCard, {Review} from "./ReviewCard";


interface ReviewListProps{
reviews:Review[];
}


const ReviewList:React.FC<ReviewListProps> = ({
reviews
}) => {


return (

<div className="space-y-3">

<h3 className="
text-sm
font-semibold
text-gray-800
">
Reviews
</h3>


{
reviews.length === 0 ? (

<p className="text-sm text-gray-500">
No reviews yet.
</p>

):

(

reviews.map(review=>(
<ReviewCard
key={review.id}
review={review}
/>
))

)

}

</div>

);

};


export default ReviewList;