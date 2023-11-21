import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import Layout from "@/layout/index"; // Here @/layout is aliases for path "components/layout"

const Home = () => {
  let router = useRouter();

  const handleOrder = () => {
    router.push("/product");
    // router.replace("/product")  , work similar to replace prop of Link component
  };
  return (
    <div>
      <div>Home</div>
      <Link href="/blog">blog</Link>
      <Link href="/product">product</Link>
      <div>
        <button onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Home;
