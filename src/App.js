import './styles.css';
import React, { useState } from 'react';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import { commentsData } from './data/mockData';

const App = () => {
  const handleNewComment = () => {
    // Hint: You can make a new comment as such
    // const newComment = {
    //   id: Date.now(),
    //   user: 'you',
    //   profileImage: 'https://i.pravatar.cc/150?img=50',
    //   text: userInput,
    //   replies: [],
    // };
    //Implement this!
  };

  const handleReply = () => {
    //Implement this
  };

  return (
    <div className="App max-w-4xl mx-auto bg-gray-50 p-10 rounded-lg shadow-lg">
      <div className="post-container bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          How to Improve Web Performance
        </h1>
        <img
          src="https://react.dev/images/home/conf2021/cover.svg"
          alt="Post"
          className="w-full h-auto rounded-lg mb-4"
        />
        <p className="text-lg text-gray-600 leading-relaxed">
          Web performance is critical to ensuring a smooth user experience.
          Optimizing for performance can be achieved through a variety of
          strategies including lazy loading images, compressing resources, and
          reducing unused code. In this post, we’ll explore how to get the most
          out of your web applications by following best practices and
          leveraging modern tools like Webpack, Lighthouse, and more.
        </p>
      </div>

      <div className="comments-section bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Comments</h2>
        <div className="new-comment-form mb-4">
          <CommentForm />
        </div>
        <h4 className="text-lg font-medium mb-4">All comments</h4>
        <CommentList comments={commentsData} />
      </div>
    </div>
  );
};

export default App;
