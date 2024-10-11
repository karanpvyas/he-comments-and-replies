//Dont change this file

import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onReply }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
};

export default CommentList;
