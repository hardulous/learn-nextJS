import Link from "next/link";
import React from "react";

const Product = () => {

  return (
    <div>
      Product
      <div>
        <Link href="/product/product-1">product-1</Link>
      </div>
      <div>
        <Link href="/product/product-2">product-2</Link>
      </div>
      <div>
        <Link href="/product/product-3" replace>product-3</Link>
      </div>
      <Link href="/">Home</Link>
    </div>
  );
};

export default Product;

// Here in Link component the replace prop replaces the current url or history state instead of adding a new url into the stack.
