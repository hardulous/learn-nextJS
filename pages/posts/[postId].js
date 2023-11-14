import React from "react";

const PostId = ({ post }) => {
  return (
    <div>
      <h4>Post Details</h4>
      <div>{post.title}</div>
      <div>{post.body}</div>
    </div>
  );
};

export default PostId;

// It is a function which is used to specify dynamic routes that should be pre-rendered to HTML at build time. It must return an object with a paths property, which is an array of objects representing the dynamic parameters for the pages you want to pre-render. 
export async function getStaticPaths() {
  return {
    // Here array contain 3 object means nextJS will pre-render this route 3 times for each value of postId 1,2 and 3
    paths: [
      { params: { postId: "1" } },
      { params: { postId: "2" } },
      { params: { postId: "3" } },
    ],
    fallback: false,
  };
}

// After specifying the dynamic paths 1,2,and 3 in getStaticPaths(), we often use getStaticProps() to fetch data for those paths 1,2 and 3.
export async function getStaticProps(context) {
  const { params } = context;  // this params.postId will consist of 3 value 1,2 and 3 coming from getStaticPaths()
  console.log(context);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();
  return {
    props: {
      post: data,
    },
  };
}

// Here as getStaticProps run in server side not in browser so we can not write react code like hooks inside it so in order to grab the dynamic route the getStaticProps() accept a parameter called context which is an object containing information about the current request

// But when we come to this page by clicking on any post then it show error "getStaticPaths is required for dynamic SSG pages and is missing" because in our ex we are asking nextJS to pre-render a page which contain dynamic parameter or route postId but we need to consider a fact that dynamic parameter does not mean single page but we will have multiple pages for different value of postId , The html for page will be same but data will be different for each postId. So nextJS ask us that i dont know what values the postId can have to pre-render the JSON value so we as a developer have to tell nextJS about the values that dynamic parameter postId can have so nextJS can pre-render the JSON based on those values. Next.js needs to know which paths to pre-render at build time. Since dynamic routes can have an infinite number of possible values, you need to specify which paths are valid.
