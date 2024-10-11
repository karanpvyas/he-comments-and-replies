import React, { useState, useRef } from 'react';
import { users } from '../data/mockData';

const CommentForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    const input = e.target.value;
    setText(input);

    // Detect @ mentions and trigger autocomplete
    const lastWord = input.split(' ').slice(-1)[0];
    if (lastWord.startsWith('@')) {
      const search = lastWord.slice(1).toLowerCase();
      const matches = users.filter((user) =>
        user.toLowerCase().startsWith(search)
      );

      if (matches.length > 0) {
        setFilteredUsers(matches);
        setShowAutocomplete(true);
      } else {
        setShowAutocomplete(false); // No matches, hide dropdown
      }

      // Calculate mention position
      const { selectionStart } = e.target;
      const inputValue = e.target.value.substring(0, selectionStart);
      const textBeforeCaret = inputValue.split('\n');
      const lastLine = textBeforeCaret[textBeforeCaret.length - 1];
      const caretPosition = lastLine.length;

      const rect = textareaRef.current.getBoundingClientRect();
      setMentionPosition({
        top: rect.top + window.scrollY + 24,
        left: rect.left + caretPosition * 8,
      });
    } else {
      setShowAutocomplete(false);
    }
  };

  const handleSelectUser = (user) => {
    const words = text.split(' ');
    words.pop(); // Remove the incomplete @mention
    setText(words.join(' ') + ` @${user} `);
    setShowAutocomplete(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText(''); // Clear input
    }
  };

  const highlightMatch = (user, searchTerm) => {
    const startIndex = user.toLowerCase().indexOf(searchTerm);
    const beforeMatch = user.slice(0, startIndex);
    const match = user.slice(startIndex, startIndex + searchTerm.length);
    const afterMatch = user.slice(startIndex + searchTerm.length);

    return (
      <>
        {beforeMatch}
        <span className="highlight">{match}</span>
        {afterMatch}
      </>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="comment-form"
      data-testid="comment-form"
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Write a comment..."
        data-testid="comment-input"
      ></textarea>

      {showAutocomplete && filteredUsers.length > 0 && (
        <ul
          className="mentions-dropdown"
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
              data-testid={`mention-item-${user}`}
            >
              {highlightMatch(user, text.split(' ').slice(-1)[0].slice(1))}
            </li>
          ))}
        </ul>
      )}

      <div className="comment-form-actions">
        <button
          type="submit"
          disabled={text.trim() === ''}
          data-testid="submit-button"
        >
          Submit
        </button>
        {onCancel && (
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
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
