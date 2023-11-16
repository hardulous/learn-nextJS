import React from "react";

const Todos = ({ todoList }) => {
  return (
    <div>
      <h2>TODOS LIST</h2>
      {todoList.map((item) => {
        return <span key={item.id}>{item.title}</span>;
      })}
    </div>
  );
};

export default Todos;

export async function getStaticProps() {
  console.log("Regenerating Page Again By ISR")
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  return {
    props: {
      todoList: data,
    },
    revalidate: 10     // Now after every 10 sec only when ever user make request to this page then pre-rendering will occur again
  };
}

// Here what will happen when i come to "/todos" page then pre-rendered page will be served and because of revalidate set to 10 now after 10 sec is passed if i again come to "/todos" page then instead of previous pre-rendered page the new page will be generated and that page will be sent to user next time when make request to that page , But within the 10 sec if i make request to "/todos" page then the same generated page will be sent to user even if there is change in backend nextJS will wait for time mentioned in revalidate key. EX, let say i have product page which i am showing now if i changed the backend value of some product price then after 10 sec the regeneration of page occur which result in updating ui of that changed price as well there is a catch here let say 10 sec is passed and then user make request to "/todos" page in this case still the same pre-rendered page will be served to the user while on the background page regeneration process will be started and when it is done the nextJS will invalidate the cache and serve the new generated page for any new request. If regeneration fails the previous cached page will be shown to the user as long as re-generation succeeds 

// If a user visit todos page but after that no other user hit the todos page the entire day re-generation will not happend. revalidate does not means the page automatically re-generate after 10 sec but it is the time after which if user again make request to the page the re-generation will happen 