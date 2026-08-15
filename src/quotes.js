'use strict';

const QUOTES = [
  'Talk is cheap. Show me the code. — Linus Torvalds',
  'Simplicity is the soul of efficiency. — Austin Freeman',
  'Premature optimization is the root of all evil. — Donald Knuth',
  'Make it work, make it right, make it fast. — Kent Beck',
  'The best error message is the one that never shows up. — Thomas Fuchs',
];

function getAllQuotes() {
  return [...QUOTES];
}

function getQuoteByIndex(index) {
  if (index < 0 || index >= QUOTES.length) {
    throw new RangeError(`index out of range: ${index}`);
  }
  return QUOTES[index];
}

function getRandomQuote(random = Math.random) {
  const index = Math.floor(random() * QUOTES.length);
  return QUOTES[index];
}

module.exports = { QUOTES, getAllQuotes, getQuoteByIndex, getRandomQuote };
