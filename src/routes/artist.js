const express = require('express');
const router = express.Router();
const { artistController, createArtist } = require('../controllers/artist');

// router.post('/artists', (req, res) => {
//   artistController(req, res);
// });
// router.post('/artists', artistController);
// module.exports = router;
router.post('/artists', createArtist);
module.exports = router;
