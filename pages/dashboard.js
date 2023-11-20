import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async () => {
  const response = await fetch("https://dummyjson.com/users/1");
  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { data, error } = useSWR("dashboard", fetcher);

  //   useEffect(() => {
  //     const getUserData = async () => {
  //       const response = await fetch("https://dummyjson.com/users/1");
  //       const data = await response.json();
  //       setUserData({
  //         name: data.firstName,
  //         email: data.email,
  //         phone: data.phone,
  //       });
  //       setLoading(false);
  //     };
  //     getUserData();
  //   }, []);

  //   if (loading) {
  //     return <div>Loading</div>;
  //   }

  if (error || !data) {
    return <div>Error While Fetching The Info</div>;
  }

  return (
    <div>
      USER INFORMATION
      {/* <div>{userData.name}</div>
      <div>{userData.email}</div>
      <div>{userData.phone}</div> */}
      <div>{data.name}</div>
      <div>{data.email}</div>
      <div>{data.phone}</div>
    </div>
  );
};

export default Dashboard;

// Here as this page is private to the user so we don't need SEO in it , In this case no need to pre-render user data on the page but will use client side fetching by useEffect

// Here when we run this page in dev mode in network tab when we preview the dashboard page we will see only Loading text but not the userData which is fetched so nextJS do pre-rendered the page but the pre-rendered page is based on the initial state of the page present at build time which is when loading state is true. When pre-rendering page nextJS will not wait for client side data fetched in useEffect to be considered in pre-rendered page.

// If we are using component unlike in pages where we can use getStaticProps() and getServerSideProps() to fetch data from external source in component we can not use such features so have to use client side data fetching.

// In nextJS for client side data fetching , nextJS team recommended to use library called "SWR (stale-while-revalidate)" must give it a try
