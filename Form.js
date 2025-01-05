'use client';
import { useState, useEffect } from 'react';
export default function Form() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/comments')
    .then(response => {
      setComments(response.data);
    })
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const nameInput = event.target[0].value;
    const commentInput = event.target[1].value;
    axios.post('http://localhost:3001/comments', {
      name: nameInput,
      comment: 'User logged in',
    });
    event.target[0].value = '';
    event.target[1].value = '';
  };
  const handleReply = (index, event) => {
    event.preventDefault();
    const nameInput = event.target[0].value;
    const replyInput = event.target[1].value;
    setComments((prevComments) => prevComments.map((comment, i) => i === index ? { ...comment, replies: [...comment.replies, { name: nameInput, reply: replyInput }] } : comment));
    event.target[0].value = '';
    event.target[1].value = '';
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" />
      <textarea placeholder="Comment" />
      <button>Submit</button>
    </form>
    <div id="comments-display">
      <h2>Comments:</h2>
      {comments.map((comment, index) => (
        <div key={index}>
          <b>{comment.name}:</b> {comment.comment}
          <form onSubmit={(e) => handleReply(index, e)}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Reply" />
            <button>Reply</button>
          </form>
          {comment.replies && comment.replies.map((reply, i) => (
            <div key={i}>
              <b>{reply.name}:</b> {reply.reply}
            </div>
          ))}
        </div>
      ))}
    </div>
    </>
  );
}