import React from "react";

export interface Review {
  id:string;
  user:string;
  rating:number;
  comment:string;
  date:string;
}


interface ReviewCardProps {
  review:Review;
}


const ReviewCard:React.FC<ReviewCardProps> = ({
  review
}) => {

return (

<div
className="
rounded-xl
border
border-gray-200
p-4
space-y-2
"
>

<div className="flex justify-between">

<div>
<p className="font-semibold text-gray-800">
{review.user}
</p>

<p className="text-yellow-500 text-sm">
{"★".repeat(review.rating)}
</p>

</div>


<span className="text-xs text-gray-400">
{review.date}
</span>


</div>


<p className="text-sm text-gray-600">
{review.comment}
</p>


</div>

);

};


export default ReviewCard;