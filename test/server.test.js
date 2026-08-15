'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/server');
const { QUOTES } = require('../src/quotes');

function withServer(fn) {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, async () => {
      const { port } = server.address();
      try {
        await fn(`http://127.0.0.1:${port}`);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        server.close();
      }
    });
  });
}

test('GET / returns a 200 text response', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/plain/);
    const body = await res.text();
    assert.match(body, /az400-app/);
  });
});

test('GET /api/quote returns JSON with a known quote', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/api/quote`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/json/);
    const body = await res.json();
    assert.ok(QUOTES.includes(body.quote));
  });
});

test('unknown routes return 404 JSON', async () => {
  await withServer(async (baseUrl) => {
    const res = await fetch(`${baseUrl}/nope`);
    assert.equal(res.status, 404);
    const body = await res.json();
    assert.deepEqual(body, { error: 'not found' });
  });
});
