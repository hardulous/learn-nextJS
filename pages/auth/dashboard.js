import React, { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const isSecure = async () => {
      const session = await getSession();

      // If user is not authenticated then first authenticate the user
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };

    isSecure();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;

// Now in nextJS in order to secure pages that is allow only authenticated user to access certain page then we again use session object but this time we get session object from function "getSession" which allows you to fetch the current user session during server-side rendering (SSR) or in the getServerSideProps and getStaticProps functions and it return a promise.
