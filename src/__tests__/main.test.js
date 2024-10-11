import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { Annotations } from '../Annotations';

const paragraph =
  'The project team has been working exceptionally well over the past few months, but there are still occasional communication issues that need to be addressed. The new hire has shown great potential and enthusiasm, yet some tasks were delayed due to a lack of experience.';

const selectWord = (word, isMetaKey = false) =>
  fireEvent.click(screen.getByText(word), { metaKey: isMetaKey });

const selectWords = (words) => {
  words.forEach(async (word) => {
    const wordEl = screen.getByText(word);
    fireEvent.click(wordEl, { metaKey: true });
  });
};

const expectWordsSelected = (words) =>
  words.forEach((word) => {
    expect(screen.getByText(word).selected).toBeTruthy();
  });

const expectWordsUnselected = (words) =>
  words.forEach((word) => expect(screen.getByText(word).selected).toBeFalsy());

const expectWordsIntent = (words, intent) =>
  words.forEach((word) => {
    expect(screen.getByText(word)).toHaveClass(`intent-${intent}`);
  });

const positiveWords = ['working', 'exceptionally', 'well', 'project', 'team'];
const positiveWords2 = ['great', 'potential'];

const negativeWords = ['communication', 'issues'];
const negativeWords2 = ['lack', 'of', 'experience.'];

test('should select and unselect multiple words', () => {
  render(<Annotations paragraph={paragraph} />);
  selectWords(positiveWords);
  expectWordsSelected(positiveWords);
  screen.getByTestId('menu');
  selectWords(negativeWords);

  expectWordsSelected([...positiveWords, ...negativeWords]);

  selectWord(positiveWords2[0]);
  selectWords(positiveWords2);

  expectWordsSelected(
    positiveWords2.filter((word) => word !== positiveWords2[0])
  );
  expectWordsUnselected([
    ...positiveWords,
    ...negativeWords,
    positiveWords2[0],
  ]);
});

test('annotates selected words with correct intent and reset works', () => {
  render(<Annotations paragraph={paragraph} />);
  selectWords(positiveWords);
  expect(screen.getByText('Reset Annotation').disabled).toBeTruthy();
  fireEvent.click(screen.getByText('Annotate Positive'));
  expect(screen.getByText('Reset Annotation').disabled).toBeFalsy();
  expectWordsIntent(positiveWords, 'positive');

  selectWords(negativeWords);

  fireEvent.click(screen.getByText('Annotate Negative'));
  expect(screen.getByText('Annotate Positive').selected).toBeFalsy();
  expect(screen.getByText('Annotate Negative').selected).toBeTruthy();

  expectWordsIntent(positiveWords2, 'default');
  selectWords(positiveWords2);
  fireEvent.click(screen.getByText('Annotate Negative'));

  selectWord(negativeWords[0]);
  fireEvent.click(screen.getByText('Annotate Positive'));

  selectWords(negativeWords2);
  fireEvent.click(screen.getByText('Annotate Negative'));

  expectWordsIntent(positiveWords, 'positive');
  expectWordsIntent(positiveWords2, 'negative');
  expectWordsIntent(negativeWords, 'positive');
  expectWordsIntent(negativeWords2, 'negative');

  selectWord(positiveWords2[1]);
  expect(screen.getByText('Annotate Positive').selected).toBeFalsy();
  expect(screen.getByText('Annotate Negative').selected).toBeTruthy();
  fireEvent.click(screen.getByText('Annotate Positive'));
  expect(screen.getByText('Annotate Positive').selected).toBeTruthy();
  expect(screen.getByText('Annotate Negative').selected).toBeFalsy();

  selectWord(negativeWords[1]);
  fireEvent.click(screen.getByText('Annotate Negative'));

  selectWord(negativeWords2[2]);
  fireEvent.click(screen.getByText('Reset Annotation'));

  expectWordsIntent(positiveWords, 'positive');
  expectWordsIntent(positiveWords2, 'positive');
  expectWordsIntent(negativeWords, 'negative');
  expectWordsIntent(negativeWords2, 'default');

  expectWordsSelected(negativeWords2);
  fireEvent.click(screen.getByText('Annotate Negative'));
  expectWordsSelected(negativeWords2);
  expectWordsIntent(negativeWords2, 'negative');

  expect(screen.getByText('Reset Annotation').disabled).toBeFalsy();
  fireEvent.click(screen.getByText('Reset Annotation'));
  expect(screen.getByText('Reset Annotation').disabled).toBeTruthy();

  selectWord(negativeWords[0]);
  fireEvent.click(screen.getByText('Reset Annotation'));

  selectWord(positiveWords[0]);
  fireEvent.click(screen.getByText('Reset Annotation'));

  selectWord(positiveWords2[0]);
  fireEvent.click(screen.getByText('Reset Annotation'));

  expectWordsIntent(negativeWords2, 'default');
  expectWordsIntent(positiveWords, 'default');
  expectWordsIntent(positiveWords2, 'default');
  expectWordsIntent(negativeWords, 'default');
  expectWordsUnselected([
    ...positiveWords,
    ...negativeWords,
    ...negativeWords2,
  ]);
  expectWordsSelected(positiveWords2);
});
