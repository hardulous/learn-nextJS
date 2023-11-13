import { useRouter } from "next/router";
import React from "react";

const Review = () => {
  let router = useRouter();

  return (
    <div>
      Review for product {router.query.productId} is {router.query.reviewId}
    </div>
  );
};

export default Review;

// Here when i come to this route i will already have some productId and reviewId route parameter available to me so i can grab them by useRouter hook of nextJS
