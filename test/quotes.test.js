'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { QUOTES, getAllQuotes, getQuoteByIndex, getRandomQuote } = require('../src/quotes');

test('getAllQuotes returns every quote as a defensive copy', () => {
  const all = getAllQuotes();
  assert.deepEqual(all, QUOTES);
  assert.notEqual(all, QUOTES);
});

test('getQuoteByIndex returns the quote at that position', () => {
  assert.equal(getQuoteByIndex(0), QUOTES[0]);
  assert.equal(getQuoteByIndex(QUOTES.length - 1), QUOTES[QUOTES.length - 1]);
});

test('getQuoteByIndex rejects out-of-range indexes', () => {
  assert.throws(() => getQuoteByIndex(-1), RangeError);
  assert.throws(() => getQuoteByIndex(QUOTES.length), RangeError);
});

test('getRandomQuote uses the injected random source deterministically', () => {
  assert.equal(getRandomQuote(() => 0), QUOTES[0]);
  assert.equal(getRandomQuote(() => 0.999), QUOTES[QUOTES.length - 1]);
});
