import React from "react";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({
  rating,
  totalReviews,
}) => {

  return (
    <div className="
      flex
      items-center
      justify-between
      rounded-xl
      bg-gray-50
      p-4
    ">

      <div>
        <p className="text-2xl font-bold text-gray-900">
          {rating.toFixed(1)}
        </p>

        <div className="flex text-yellow-500">
          {"★★★★★".split("").map((star, i) => (
            <span key={i}>
              {i < Math.round(rating) ? "★" : "☆"}
            </span>
          ))}
        </div>
      </div>


      <p className="text-sm text-gray-500">
        {totalReviews} reviews
      </p>

    </div>
  );
};


export default RatingSummary;