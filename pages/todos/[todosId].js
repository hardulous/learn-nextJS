import { useRouter } from "next/router";
import React from "react";

const TodoItem = ({ detail }) => {

  const router = useRouter()
  
  if(router.isFallback){
    return <div>Loading....</div>
  }

  return (
    <div>
      <h3>Todo Item</h3>
      <span>
        {detail.id} - {detail.title}
      </span>
    </div>
  );
};

export default TodoItem;

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          todosId: '1',
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params.todosId}`
  );
  const data = await response.json();
  return {
    props: {
      detail: data,
    },
    revalidate: 10     // Now for dynamic route as well re-generation will occur after 10 sec if user visited the page
  };
}

// Here above we are pre-rendering page for dynamic value 1 only and rest will generated on demand if user request for some other value of todosId. But again if let say we have pre-rendered the page for todosId 4 and then in backend todosId 4 object has changed so in this case when ever user again request for this page of todosId 4 so the already generated page will be shown instead of re-generating new page for the changes. So in order to solve this issue of stale state we use INCREMENTAL STATIC GENERATION as there is a need to update only those pages which needed a change without having to rebuild the app again.

// ISG can be done by getStaticProps() in which apart from props key we have to specify revalidate key as well which is number of seconds after which page regeneration or pre-rendering will occur again.