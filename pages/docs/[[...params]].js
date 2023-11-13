import { useRouter } from "next/router";
import React from "react";

const CatchAll = () => {
  let router = useRouter();
  let { params = [] } = router.query;
  console.log(params);
  
  if(params.length==2){
    return <div>Viewing docs for feature {params[0]} and concept {params[1]}</div>
  }
  else if(params.length==1){
    return <div>Viewing docs for feature {params[0]}</div>
  }
  else{
    return <div>Home page of docs</div>
  }

};

export default CatchAll;

// Here in catch all route unlike in dynamic route where whatever dynamic segment passed to url will be available to router.query but in catch all route that router.query will corresponde to array of url segments
