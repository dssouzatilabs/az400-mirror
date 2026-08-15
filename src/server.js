'use strict';

const http = require('node:http');
const { getRandomQuote } = require('./quotes');

const DEFAULT_PORT = 3000;

function createServer() {
  return http.createServer((req, res) => {
    const { method } = req;
    const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);

    if (method === 'GET' && url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('az400-app is running. Try GET /api/quote.\n');
      return;
    }

    if (method === 'GET' && url.pathname === '/api/quote') {
      const quote = getRandomQuote();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ quote }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
  });
}

function start(port = process.env.PORT || DEFAULT_PORT) {
  const server = createServer();
  server.listen(port, () => {
    console.log(`az400-app listening on port ${port}`);
  });
  return server;
}

if (require.main === module) {
  start();
}

module.exports = { createServer, start };
