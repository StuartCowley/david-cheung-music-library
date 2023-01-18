const express = require('express');
const router = express.Router();
// const { artistController} = require('../controllers/artist');
const { createArtist } = require('../controllers/artist');
const { readArtist } = require('../controllers/artist');
const { readSingleArtist } = require('../controllers/artist');
const { updateArtist } = require('../controllers/artist');
const { patchArtist } = require('../controllers/artist');
const { deleteArtist } = require('../controllers/artist');

// $$$ my solution $$$
// router.post('/artists', (req, res) => {
//   artistController(req, res);
// });
// router.post('/artists', artistController);
// module.exports = router;

router.post('/artists', createArtist);
router.get('/artists', readArtist);
router.get('/artists/:id', readSingleArtist);
router.put('/artists/:id', updateArtist);
router.patch('/artists/:id', patchArtist);
router.delete('/artists/:id', deleteArtist);

module.exports = router;
