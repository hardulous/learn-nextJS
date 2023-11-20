import { Comments } from "@/data/comments";

export default function handler(req, res) {
  // This end point is for dynamic route commentId so req.query object will consist of commentId passed in the URL
  const { commentId } = req.query;

  if (req.method === "GET") {
    const comment = Comments.find((item) => item.id === parseInt(commentId));
    res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    let index;
    const deletedComment = Comments.find((item, i) => {
      if (item.id !== parseInt(commentId)) {
        return false;
      } else {
        index = i;
        return true;
      }
    });
    if (index !== -1) {
      Comments.splice(index, 1);
      res.status(200).json({
        deletedComment,
        success: true,
      });
    } else {
      res.status(200).json({
        msg: "No Comment With This Id",
        success: false,
      });
    }
  }
}

// Dynamic api route is created similar to the way dynamic pages route are created just square bracket with name of dynamic params [name].js
