import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('should add a new top-level comment and place it in the correct position', () => {
  render(<App />);

  const input = screen.getByTestId('comment-input');
  const submitButton = screen.getByTestId('submit-button');

  fireEvent.change(input, {
    target: { value: 'This is a new top-level comment' },
  });
  fireEvent.click(submitButton);

  const commentList = screen.getByTestId('comment-1').parentElement;
  expect(commentList.children[0]).toHaveTextContent(
    'This is a new top-level comment'
  );
});

test('should add a reply to an existing comment and nest it correctly', () => {
  render(<App />);

  const replyButton = screen.getByTestId('reply-button-1');
  fireEvent.click(replyButton);

  const replyForm = screen.getByTestId('comment-form-wrapper-1');
  const replyInput = replyForm.querySelector('[data-testid="comment-input"]');
  const submitReplyButton = replyForm.querySelector(
    '[data-testid="submit-button"]'
  );

  fireEvent.change(replyInput, {
    target: { value: 'This is a reply to the first comment' },
  });
  fireEvent.click(submitReplyButton);

  const parentComment = screen.getByTestId('comment-1');
  const repliesContainer = parentComment.querySelector('.reply-container');

  expect(repliesContainer.children[0]).toHaveTextContent(
    'This is a reply to the first comment'
  );
});

test('should show only matching mention items in the dropdown', () => {
  render(<App />);

  const input = screen.getByTestId('comment-input');
  fireEvent.change(input, { target: { value: '@a' } });

  const mentionDropdown = screen.getByTestId('mentions-dropdown');

  expect(screen.getByTestId('mention-item-Alice')).toBeTruthy();
  expect(screen.queryByTestId('mention-item-Bob')).not.toBeInTheDocument();
  expect(screen.queryByTestId('mention-item-Charlie')).not.toBeInTheDocument();
});

test('should display cancel and submit buttons when the reply form is open, and submit button should be enabled/disabled based on input', () => {
  render(<App />);

  const replyButton = screen.getByTestId('reply-button-1');
  fireEvent.click(replyButton);

  const replyForm = screen.getByTestId('comment-form-wrapper-1');
  const cancelButton = replyForm.querySelector('[data-testid="cancel-button"]');
  const submitButton = replyForm.querySelector('[data-testid="submit-button"]');
  const replyInput = replyForm.querySelector('[data-testid="comment-input"]');

  expect(cancelButton).toBeTruthy();
  expect(submitButton).toBeTruthy();

  expect(submitButton).toBeDisabled();

  fireEvent.change(replyInput, { target: { value: 'This is a reply' } });

  expect(submitButton).not.toBeDisabled();

  fireEvent.change(replyInput, { target: { value: '' } });

  expect(submitButton).toBeDisabled();
});

test('should hide mention dropdown when no matches are found', () => {
  render(<App />);

  const input = screen.getByTestId('comment-input');

  fireEvent.change(input, { target: { value: '@' } });
  screen.getByTestId('mentions-dropdown');

  fireEvent.change(input, { target: { value: ' @z' } });

  const mentionDropdown = screen.queryByTestId('mentions-dropdown');
  expect(mentionDropdown).not.toBeInTheDocument();
});

test('should unmount the reply input after submitting a reply', () => {
  render(<App />);

  const replyButton = screen.getByTestId('reply-button-1');
  fireEvent.click(replyButton);

  const replyForm = screen.getByTestId('comment-form-wrapper-1');
  expect(replyForm).toBeInTheDocument();

  const replyInput = replyForm.querySelector('[data-testid="comment-input"]');
  fireEvent.change(replyInput, { target: { value: 'This is a reply' } });

  const submitButton = replyForm.querySelector('[data-testid="submit-button"]');
  fireEvent.click(submitButton);

  expect(
    screen.queryByTestId('comment-form-wrapper-1')
  ).not.toBeInTheDocument();
});

test('should highlight matching parts of the mention in the dropdown using data-highlight', () => {
  render(<App />);

  const input = screen.getByTestId('comment-input');
  fireEvent.change(input, { target: { value: '@al' } });

  const mentionDropdown = screen.getByTestId('mentions-dropdown');
  expect(mentionDropdown).toBeInTheDocument();

  const mentionItem = screen.getByTestId('mention-item-Alice');
  expect(mentionItem).toBeInTheDocument();

  const highlightedPart = mentionItem.querySelector('span[data-highlight]');
  expect(highlightedPart).toHaveTextContent('Al');
});
