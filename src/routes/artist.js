const express = require('express');
const router = express.Router();
const { artistController } = require('../controllers/artist');

// router.post('/artists', (req, res) => {
//   artistController(req, res);
// });
router.post('/artists', artistController);

module.exports = router;
