import { useRouter } from "next/router";
import React, { useState } from "react";

const Shopping = ({ list }) => {

  console.log("Render")  

  const router = useRouter();
  const [id, setId] = useState("");
  const [shopList, setShopList] = useState(list.products);

  // For filtering of data as it depends on user interaction we will use client side data fetching because we dont need SEO for filtering of data
  const filterShopList = async () => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${id}`);
    const data = await response.json();
    console.log(data)
    setShopList(data.products);

    // Here below doing shallow routing by which page wil re-render again on changing url in browser and will not call any data fetching method again. Here now we can share the url of filtered product to anyone because we have handled the case of filterd url by querystring in getServerSideProps() which will hep in SEO as well. 
    router.push(`/shopping?q=${id}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={filterShopList}>Filter</button>

      <h2>Shopping List</h2>

      {shopList.map((item, i) => {
        return (
          <div key={i}>
            {i} - {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Shopping;

// Here for SEO in product list we are using SSR which will pre-render page at request time
export async function getServerSideProps(context) {
  const { query } = context;
  const { q } = query;
  const queryString = q ? `/search?q=${q}` : "";
  const response = await fetch(`https://dummyjson.com/products${queryString}`);
  const data = await response.json();

  return {
    props: {
      list: data,
    },
  };
}

// Here in above for initial page we are pre-rendering only list of product list but once user interacted with our website and want to filter it then filtered product list will be fetch by client side data fetching. But if i want to share the url of filtered product list to some friend then it is not possible as url is same for both filtered and entire product list , We can however improve this by making use of shallow routing , By shallow routing we can update the url in the browser without running the getServerSideProps() and other data fetching methods again.

// When you use shallow routing, only the component is re-rendered, and it preserves the current state of the page. This can be beneficial for scenarios where you want to update the URL or query parameters without fetching fresh data, leading to a smoother user experience during navigation.