import './styles.css';
import React, { useState } from 'react';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm'; // Import for adding new comments
import { commentsData } from './data/mockData';

const App = () => {
  const [comments, setComments] = useState(commentsData);

  const handleReply = (commentId, text) => {
    const newComments = [...comments];

    const addReply = (comment) => {
      if (comment.id === commentId) {
        comment.replies = [
          {
            id: Date.now(),
            user: 'you',
            profileImage: 'https://i.pravatar.cc/150?img=50', // Use a default or actual user's profile image
            text,
            replies: [],
          },
          ...comment.replies,
        ];
      } else {
        comment.replies.forEach((reply) => addReply(reply));
      }
    };

    newComments.forEach(addReply);
    setComments(newComments);
  };

  const handleNewComment = (text) => {
    const newComment = {
      id: Date.now(),
      user: 'you',
      profileImage: 'https://i.pravatar.cc/150?img=50', // Use a default or actual user's profile image
      text: text,
      replies: [],
    };

    // Add the new comment at the top of the list
    setComments([newComment, ...comments]);
  };

  return (
    <div className="App" data-testid="app">
      <div className="post-container">
        <h1 className="post-title">How to Improve Web Performance</h1>
        <img
          src="https://react.dev/images/home/conf2021/cover.svg"
          alt="Post"
          className="post-image"
        />
        <p className="post-content">
          Web performance is critical to ensuring a smooth user experience.
          Optimizing for performance can be achieved through a variety of
          strategies including lazy loading images, compressing resources, and
          reducing unused code. In this post, we’ll explore how to get the most
          out of your web applications by following best practices and
          leveraging modern tools like Webpack, Lighthouse, and more.
        </p>

        <div className="comments-section">
          <h2>Comments</h2>
          <div className="new-comment-form" data-testid="new-comment-form">
            <CommentForm onSubmit={handleNewComment} />
          </div>
          <h4>All comments</h4>
          <CommentList comments={comments} onReply={handleReply} />
        </div>
      </div>
    </div>
  );
};

export default App;
