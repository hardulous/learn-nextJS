import User from "@/components/User";
import React from "react";

// Here the prop userList is coming from below getStaticProps function which will execute at build time
const Users = ({ userList }) => {
  return (
    <div>
      <h4>Users</h4>
      {userList.map((item, i) => {
        return (
          <div key={i}>
            <User user={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Users;

// This function will run at build time
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);

  return {
    props: {
      userList: data,
    },
  };
}

// In nextjs when we export a page component we can also export an async function called getStaticProps() which will run at build time in production and on every request in dev and inside this function we can fetch and make any api call to external data and passed that data as a prop to that page component. But from this function we must have to return an object which consist of props property and this props will be passed as a props to the main page component.

// Here the above code is working well but this is not how we write production code in nextJS , But we will create seprate jsx file which will accept user details as props from this page component and display it on the UI but this display jsx file should not be inside the pages folder directory because pages folder is special folder that provides feature like routing and function like getStaticProps() and this feature should not be available to presentation component. So a seprate directory let say component for presentation jsx.

// So difference btw page and component is if we want to expose a ui as a route then create a page but if want to just create ui for presentation then create a component because component does not require special feature like ones provided to pages.