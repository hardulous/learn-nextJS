import React, { useState } from "react";

const Comments = () => {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");

  // Here on button click we will make get api call to our api defined in /api folder
  const loadComments = async () => {
    const data = await (
      await fetch("http://localhost:3000/api/comments")
    ).json();
    setCommentList(data);
  };

  const addPost = async () => {
    const data = await (
      await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        body: JSON.stringify({
          comment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    setCommentList((c) => c.concat(data));
  };

  const deleteComment = async (id) => {
    const data = await (
      await fetch(`http://localhost:3000/api/comments/${id}`, {
        method: "DELETE",
      })
    ).json();
    if (data.success) {
      loadComments();
    } else {
      alert(data.msg);
    }
  };

  return (
    <div>
      <button onClick={loadComments}>Load Comments</button>
      <h2>Comments ::</h2>
      {commentList.map((item) => {
        return (
          <div key={item.id}>
            <span>{item.comment}</span>
            <button onClick={()=>deleteComment(item.id)}>Delete</button>
          </div>
        );
      })}

      <h2>Add a comment</h2>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={addPost}>Add Comment</button>
    </div>
  );
};

export default Comments;
