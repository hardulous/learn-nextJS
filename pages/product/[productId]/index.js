import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProductDetails = () => {
  let router = useRouter();

  return (
    <div>
      ProductDetails - {router.query.productId}
      <Link href="/">Home</Link>
    </div>
  );
};

export default ProductDetails;

// In order to grab the route parameter we will use useRouter hook which have query property which contain all dynamic parameter passed in the url
