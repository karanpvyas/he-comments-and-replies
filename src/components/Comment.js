import React, { useState } from 'react';
import CommentForm from './CommentForm';

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = () => {
    //Implement this
  };

  const handleCancelReply = () => {
    //Implement this
  };

  return (
    <div
      className="comment-container mb-4 bg-white p-4 rounded-lg shadow-sm"
      data-testid={`comment-${comment.id}`}
    >
      <div className="comment-header flex items-start mb-4">
        <img
          src={comment.profileImage}
          alt={comment.user}
          className="profile-image w-10 h-10 rounded-full mr-4 object-cover"
        />
        <div className="comment-content flex-grow">
          <p className="text-sm text-gray-600">
            <strong className="text-gray-800">{comment.user}</strong>:{' '}
            {comment.text}
          </p>
          {!showReplyForm && (
            <div className="reply-button mt-2">
              <button
                onClick={() => {
                  /** Implement this */
                }}
                className="text-blue-600 hover:text-blue-800 font-bold"
                data-testid={`reply-button-${comment.id}`}
              >
                Reply
              </button>
            </div>
          )}
        </div>
      </div>

      {showReplyForm && (
        <div
          className="comment-form-wrapper mt-2"
          data-testid={`comment-form-wrapper-${comment.id}`}
        >
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={handleCancelReply}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="reply-container ml-6 mt-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
