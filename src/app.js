const express = require('express');
const app = express();

app.use(express.json());

// app.post('/artists', (req, res) => {
//   res.sendStatus(201);
// });

const artistRouter = require('../src/routes/artist');
app.use(artistRouter);
module.exports = app;
