import React, { useState, useRef } from 'react';
import { users } from '../data/mockData';

const CommentForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);

  const setMentionPopoverCoordinates = () => {
    const rect = textareaRef.current.getBoundingClientRect();
    setMentionPosition({
      top: rect.top + window.scrollY + 24,
      left: rect.left /** + some buffer here to make it look just like in the video? */,
    });
  };

  const handleTextChange = (e) => {
    //Implement this
    //Hint: based on some logic, might want to call setMentionPopoverCoordinates from here.
  };

  const handleSelectUser = (user) => {
    //Implement
  };

  const highlightMatch = (user, searchTerm) => {
    //Implement this so the matched substring gets highlighed when rendering mentioned users.

    const beforeMatch = user;
    const match = '';
    const afterMatch = '';

    return (
      <>
        {beforeMatch}
        <span data-highlight style={{ color: 'blue', fontWeight: 'bold' }}>
          {match}
        </span>
        {afterMatch}
      </>
    );
  };

  const handleSubmit = (e) => {
    //Implement this
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="comment-form flex flex-col mt-2"
      data-testid="comment-form"
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Write a comment..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        data-testid="comment-input"
      ></textarea>

      {showAutocomplete && filteredUsers.length > 0 && (
        <ul
          className="mentions-dropdown absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto w-64"
          style={{
            top: `${mentionPosition.top}px`,
            left: `${mentionPosition.left}px`,
          }}
          data-testid="mentions-dropdown"
        >
          {filteredUsers.map((user) => (
            <li
              key={user}
              onClick={() => handleSelectUser(user)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              data-testid={`mention-item-${user}`}
            >
              {highlightMatch(user, text.split(' ').slice(-1)[0].slice(1))}
            </li>
          ))}
        </ul>
      )}

      <div className="comment-form-actions flex items-center mt-4">
        <button
          type="submit"
          className={`mr-4 px-4 py-2 rounded-md font-semibold text-white ${
            text.trim()
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          disabled={text.trim() === ''}
          data-testid="submit-button"
        >
          Submit
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cancel-button px-4 py-2 rounded-md font-semibold bg-gray-400 hover:bg-gray-500 text-white"
            data-testid="cancel-button"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
