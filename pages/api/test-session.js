import { getSession } from "next-auth/react";

export default async function handler(req,res){
  
    // Here have to call getSession() with req object coming to this route
    const session = await getSession({req})

    // Here now if user is not authenticated and try to access the api then we can return some other response then actual one
    if(!session){
        return res.status(401).json({message:"Unautorized Access"})
    }
    else{
        return res.status(200).json({session})
    }

}

// Here we can also secure api routes using nextAuth.js again using getSession() of nextAuth.js