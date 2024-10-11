import React, { useState } from 'react';
import CommentForm from './CommentForm';

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = (text) => {
    setShowReplyForm(false);
    onReply(comment.id, text);
  };

  const handleCancelReply = () => {
    setShowReplyForm(false);
  };

  return (
    <div className="comment-container" data-testid={`comment-${comment.id}`}>
      <div className="comment-header">
        <img
          src={comment.profileImage}
          alt={comment.user}
          className="profile-image"
        />
        <div className="comment-content">
          <p>
            <strong>{comment.user}</strong>: {comment.text}
          </p>
          {!showReplyForm && (
            <div className="reply-button">
              <button
                onClick={() => setShowReplyForm(true)}
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
          className="comment-form-wrapper"
          data-testid={`comment-form-wrapper-${comment.id}`}
        >
          <CommentForm
            onSubmit={handleReplySubmit}
            onCancel={handleCancelReply}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="reply-container">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
