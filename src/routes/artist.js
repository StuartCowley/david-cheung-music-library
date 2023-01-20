const express = require('express');
const router = express.Router();
const controllers = require('../controllers/artist');

// $$$ my solution $$$
// router.post('/artists', (req, res) => {
//   artistController(req, res);
// });
// router.post('/artists', artistController);
// module.exports = router;

router.post('/artists', controllers.createArtist);
router.get('/artists', controllers.readArtist);
router.get('/artists/:id', controllers.readSingleArtist);
router.put('/artists/:id', controllers.updateArtist);
router.patch('/artists/:id', controllers.patchArtist);
router.delete('/artists/:id', controllers.deleteArtist);

module.exports = router;
