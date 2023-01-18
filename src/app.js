const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ result: 'hello world!' });
});

// $$$ my testing $$$
// app.get('/hello', (req, res) => {
//   res.json({ result: 'hello' });
// });
// app.get('/hello/:name', (req, res) => {
//   res.json({ result: req.params.name });
// });

const artistRouter = require('../src/routes/artist');
app.use(artistRouter);

module.exports = app;
