import Link from "next/link";
import React from "react";

const Posts = ({ postList }) => {
  return (
    <div>
      <h4>Posts</h4>
      {postList.map((item, i) => {
        return (
          <div key={i}>
            <Link href={`/posts/${item.id}`}>
              {i + 1} - {item.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return {
    props: {
      postList: data.slice(0, 3), // returning only 3 posts
    },
  };
}

// Here above even though we can implement master detail pattern by making api call in useEffect hook but by this pre-rendering of JSON data coming from backend api will not take place.
