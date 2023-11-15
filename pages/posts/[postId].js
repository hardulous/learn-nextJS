import React from "react";
import { useRouter } from "next/router";

const PostId = ({ post }) => {

  const router = useRouter()

  if(router.isFallback){
    return <h1>Loading.....</h1>
  }

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
  // return {
  //   // Here array contain 3 object means nextJS will pre-render this route 3 times for each value of postId 1,2 and 3
  //   paths: [
  //     { params: { postId: "1" } },
  //     { params: { postId: "2" } },
  //     { params: { postId: "3" } },
  //   ],
  //   fallback: false,
  // };

  // Here above in real world application we never hard code the dynamic parameter but rather fetch the possible values from backend api or some other source and then based on those value we create the paths array.
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  const paths = data.map((item) => {
    return {
      params: {
        postId: `${item.id}`, // have to pass value of dynamic path as string
      },
    };
  });

  return {
    paths, // Here path array is created based on dynamic value coming from backend
    // fallback: false,
    fallback: true    // Now nextJS will not send 404 page for path not send by getStaticPaths()
  };
}

// After specifying the dynamic paths 1,2,and 3 in getStaticPaths(), we often use getStaticProps() to fetch data for those paths 1,2 and 3.
export async function getStaticProps(context) {
  const { params } = context; // params.postId will consist of value coming from getStaticPaths()
  // console.log(context);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();

  console.log(`Generating new page ${params.postId}`)

  return {
    props: {
      post: data,
    },
  };

  // Here now if i run npm run build then in terminal we will see 100 pages for "/posts/postId" route is pre-rendered because our path array consist of 100 object for diff value of postId coming from backend and for each object a seperate html and json file will be pre-rendered  

}

// Here as getStaticProps run in server side not in browser so we can not write react code like hooks inside it so in order to grab the dynamic route the getStaticProps() accept a parameter called context which is an object containing information about the current request

// But when we come to this page by clicking on any post then it show error "getStaticPaths is required for dynamic SSG pages and is missing" because in our ex we are asking nextJS to pre-render a page which contain dynamic parameter or route postId but we need to consider a fact that dynamic parameter does not mean single page but we will have multiple pages for different value of postId , The html for page will be same but data will be different for each postId. So nextJS ask us that i dont know what values the postId can have to pre-render the JSON value so we as a developer have to tell nextJS about the values that dynamic parameter postId can have so nextJS can pre-render the JSON based on those values. Next.js needs to know which paths to pre-render at build time. Since dynamic routes can have an infinite number of possible values, you need to specify which paths are valid.

// Here getStaticPaths() also return a fallback key which is mandatory to be send and it can have 3 value false , true and blocking. When fallback is false it means , The path returned from getStaticPaths will be rendered to HTML at build time by getStaticProps and any path which is not returned by getStaticPaths will result in 404 page for ex, If let say in my "/posts/postId" route i have only 3 dynamic route for postId 1,2 and 3 so only 3 HTML page will be pre-rendered by nextJS , If we try to access any route which is not returned by getStaticPaths then it will give 404 page it means if i try to navigate to "/posts/4" it will give 404 page cuz getStaticPaths does not return 4 as value.

// We use fallback set to false when we have application with small number of path to pre-render and new pages are not added often. 

// When fallback set to true again the path returned from getStaticPaths will be rendered to HTML at build time by getStaticProps. The path which is not generated at build time will not result in 404 page when user try to access them instead nextJS will serve a fallback version of that page and in the background nextJS will statically generate the requested path HTML and JSON this include running getStaticProps as well and when it is done browser recevie the JSON for requested path which will be used to render the page , From user perspective the page will be swapped from fallback page to full page , At the same time nextJS keeps the track of new list of pre-rendered pages. Subsequent request to the same path will serve the same generated page.