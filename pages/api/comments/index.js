import { Comments } from "@/data/comments";

export default function handler(req, res) {
  // Here by default what ever api we create , It serve and work as GET request
  if (req.method === "GET") {
    res.status(200).json(Comments);
  }

  // To handle case for method other than GET we have to use req.method property for condition
  else if (req.method === "POST") {
    const comment = req.body.comment; // Unlike in nodeJS no need to parse req body it is automatically parsed 
    const newComment = {
      id: Comments.length + 1,
      comment,
    };
    Comments.push(newComment);
    res.status(201).json(newComment);
  }
}
