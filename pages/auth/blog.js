import { getSession } from 'next-auth/react'
import React from 'react'

const Blog = ({text}) => {
  return (
    <div>
     <h2>Blog</h2>
     <h4>{text}</h4>
    </div>
  )
}

export default Blog

export async function getServerSideProps(context){

  // Here unlike in client side auth where we directly call getSession() in SSR we have to call it with request information as well  
 const session = await getSession(context)

 if(!session){
  return {
    redirect:{
      destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blog", // Here if user not authenticated and user come to this page then he will be redirected to signin page and once signin is done then again redirected to same blog page
      permanent: false 
    }
  }
 }

 return {
  props:{
    session,   
    text: session ? 'List Of 100 Paid Posts' : "List Of Free Posts"
  }
 }

}

// Here if using session in SSR must pass as props because in SessionProvider component in _app.js we can pass session props to it which help in managing session object for whole app , Passing session for SSR is available in pageProps and from there we can pass it down to SessionProvider component 

// Now instead of allowing user to access free content when not logged in we will redirect him to home page and not allow him to view the blog page , it can be done with the help of redirect object returned by SSR ::

/*

1. destination: This is the path to which the client should be redirected.

2. permanent: If set to true, it indicates a permanent redirect (HTTP status code 301). If set to false, it indicates a temporary redirect (HTTP status code 302). A permanent redirect is cached by browsers, so subsequent requests go directly to the new location.

*/